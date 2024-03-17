import { FaCloudArrowDown } from "react-icons/fa6";

function DownloadFile({ url }) {
    const parts = url.split('/');
    parts.splice(6, 0, 'fl_attachment')
    const result = parts.join('/');
    console.log(result);
    return (
        <>
            <a href={result} download>
                <button className="btn">
                    <FaCloudArrowDown className="text-base text-white" />
                    Download
                </button>
            </a>
        </>
    )
}


export default DownloadFile
