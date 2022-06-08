import ExportCSV from "./ExportCSV";

export default function Statement(){
    const file = new File(["本月損益表"], "foo.xlsx", {
        type: "text/plain",
    });

    function download() {
        const link = document.createElement('a')
        const url = URL.createObjectURL(file)
      
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
      
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    return (
        <div>
        {/* <ExportCSV /> */}
        <button style={{opacity: '0'}} onclick={download()}>Click me</button>
        </div>
    )
}