export class Hands_Class {
    constructor() {
        this.videoElement = null;
        this.img = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.hands = null;
        this.camera = null;
    }

    onResults(results) {
        this.canvasCtx.save();
        this.canvasCtx.beginPath();
        this.canvasCtx.translate(this.canvasElement.width, 0);
        this.canvasCtx.scale(-1, 1);
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width * -1, this.canvasElement.height);
        this.canvasCtx.drawImage(
            this.img, 0, 0, this.canvasElement.width, this.canvasElement.height);
        // results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                let x = landmarks[8].x * this.canvasElement.width;
                let y = landmarks[8].y * this.canvasElement.height;
                this.canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
                this.canvasCtx.fill();
                // console.log(landmarks)
                // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                //     {color: '#00FF00', lineWidth: 5});
                // drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            }
        }
        this.canvasCtx.restore()
    }

    start(src) {
        this.videoElement = document.createElement('video');
        this.img = new Image();
        this.img.src = src;
        this.canvasElement = document.getElementsByClassName('output_canvas')[0];
        this.canvasCtx = this.canvasElement.getContext('2d');
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });
        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        this.hands.onResults(this.onResults.bind(this));
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({image: this.videoElement});
            },
            width: 1280,
            height: 720
        });
        this.camera.start();

    }


}