function useBlobUtils() {
  function downloadTextAsTxtFile({
    text,
    nameOfFile,
  }: {
    text: string;
    nameOfFile: string;
  }) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nameOfFile;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return { downloadTextAsTxtFile };
}

export default useBlobUtils;
