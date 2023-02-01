import { S3Client, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3"

const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY

export const UploadPDF: React.FC = () => {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    })

    async function Put() {
        try {
            const res = await client.send(
                new PutObjectCommand({Bucket: "holdmy-pdf-plz", Body:"hello", Key: "hello"})
            )
            console.log(res)

        } catch (error) {
            console.log(error)
        }
    }

    async function Get() {
        try {

            const data = await client.send(
                new ListObjectsCommand({ Bucket: "holdmy-pdf-plz", Prefix: "images" })
            );
            console.log(data)

        } catch (error) {
            console.log(error) 
        }
    }
    Put()
    Get()

    return (
        <>
        hello
        </>
    )
}