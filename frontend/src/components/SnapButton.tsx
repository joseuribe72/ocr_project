// code referenced from: https://www.youtube.com/watch?v=V4dauky6UU8

const SnapButton: React.FC = () => {

    const screenShot = () => {
        const element = document.getElementById("draw-one");

        if (!(element instanceof HTMLCanvasElement)) {
            console.error("Not a canvas");
            return;
        }

        const newElement = document.createElement("canvas");
        newElement.width = element.width;
        newElement.height = element.height;
        const context = newElement.getContext("2d");

        if (!context) {
            return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, newElement.width, newElement.height);
        context.drawImage(element, 0, 0);

        newElement.toBlob(blob => {
            if (!blob) {
                console.error("Blob creation failed");
                return;
            }

            const formData = new FormData();
            formData.append('file', blob, 'screenshot.jpeg');

            fetch('http://localhost:8080/store', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }, "image/jpeg");
    };

    return (<button className="btn" onClick={screenShot}>Process</button>);
};

export default SnapButton;