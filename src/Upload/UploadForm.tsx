import { useState, useRef } from "react"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid4 } from "uuid"
import { Client } from "./s3Client"
import { useNavigate } from "react-router-dom"

export const UploadForm: React.FC = () => {

    const fileInput = useRef<HTMLInputElement | null>(null)

    const [pdf, setPDF] = useState<File | null>(null)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

    const navigate = useNavigate()

    function handleFileInput() {
        if (fileInput.current?.files) {
            setButtonIsDisabled(false)
            setPDF(fileInput.current.files[0])
        }
    }

    async function handleSubmitClick() {
        if (pdf && !buttonIsDisabled) {
            // onClick:
            //     make folder
            //     upload to folder
            //     trigger lambda (pdf -> images transform)

            const folderName = uuid4()
            try {
                // make folder
                const folderRes = await Client.send(
                    new PutObjectCommand({Bucket: "holdmy-pdf-plz", Key: `${folderName}/`})
                )

                // upload pdf to folder
                const pdfRes = await Client.send(
                    new PutObjectCommand({Bucket: "holdmy-pdf-plz", Body: pdf, Key: `${folderName}/uploaded.pdf`})
                )

                // invoke transform lambda
                const lambdaRes = await fetch('https://6981ltcmo4.execute-api.us-east-1.amazonaws.com/default/pdf_transform_lambda', {
                    method: 'POST',
                    body: JSON.stringify({"folderName": folderName}),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })

                // TODO: loading spinner
                
                const imageURLS = await lambdaRes.json()
                // redirect to draw page, passing imageURLS to the location state. (due to react router)
                navigate('/draw', { state: {imageURLS: imageURLS} })
            } catch (error) {
                console.log(error)
            }

        }
    }
    
    return (
        <div id="upload-form" className="flex flex-col justify-around bg-white h-full rounded-lg shadow-lg p-6">
            <h1 className="text-gray-900 text-xl leading-tight font-bold mb-2">
                Upload your PDF: 
            </h1>

            <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg- bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                ref={fileInput} type="file" accept=".pdf" 
                onChange={handleFileInput}>
            </input>

            <div className="flex justify-end">
                <button className={`bg-blue-600 ${buttonIsDisabled ? 'opacity-60' : 'opacity-100'} inline-block px-6 py-2.5  text-white font-medium text-sm leading-tight uppercase rounded shadow-lg`}
                    disabled={buttonIsDisabled} onClick={handleSubmitClick}>
                    submit
                </button>
            </div>
        </div>
    )
}