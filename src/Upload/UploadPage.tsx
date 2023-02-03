import { UploadForm } from "./UploadForm"

export const UploadPage: React.FC = () => {
    return (
        <div id="upload-page" className="bg-neutral-200 h-full flex justify-center items-center" >
            <div id="form-card" className="w-1/3 h-1/3">
                <UploadForm />
            </div>
        </div>
    )
}