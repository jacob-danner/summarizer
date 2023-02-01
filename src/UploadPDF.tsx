import { useState, useRef } from "react"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { Client } from "./s3Client"

export const UploadPDF: React.FC = () => {

    const fileInput = useRef<HTMLInputElement | null>(null)

    const [pdf, setPDF] = useState<File | null>(null)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

    function handleFileInput() {
        if (fileInput.current?.files) {
            setButtonIsDisabled(false)
            setPDF(fileInput.current.files[0])
        }
    }

    async function handleSubmitClick() {
        if (pdf && !buttonIsDisabled) {
            // send pdf to s3
            console.log(pdf.name)
            try {
                const res = await Client.send(
                    new PutObjectCommand({Bucket: "holdmy-pdf-plz", Body: pdf, Key: "trial.pdf"})
                )
                console.log(res)

            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <>
            <input ref={fileInput} type="file" accept=".pdf" onChange={handleFileInput}></input>
            <button className="border border-gray-900" disabled={buttonIsDisabled} onClick={handleSubmitClick} >hello</button>
        </>
    )
}