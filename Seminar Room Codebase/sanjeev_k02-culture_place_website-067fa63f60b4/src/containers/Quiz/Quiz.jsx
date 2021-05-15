import React from "react";
import "./Quiz.css";
import Webcam from "react-webcam";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function Quiz() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [startCam, setStartCam] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const startCameraNow = () => {
    setStartCam(true);
  };

  const closeCamera = () => {
    setStartCam(false);
  };

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "Tell-me-about-self.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const displayAnswer = () => {
    if (document.getElementById("option-11").checked) {
      document.getElementById("block-11").style.border = "3px solid limegreen";
      document.getElementById("result-11").style.color = "limegreen";
      document.getElementById("result-11").innerHTML = "Correct!";
    }
    if (document.getElementById("option-12").checked) {
      document.getElementById("block-12").style.border = "3px solid red";
      document.getElementById("result-12").style.color = "red";
      document.getElementById("result-12").innerHTML = "Incorrect!";
      showCorrectAnswer();
    }
    if (document.getElementById("option-13").checked) {
      document.getElementById("block-13").style.border = "3px solid red";
      document.getElementById("result-13").style.color = "red";
      document.getElementById("result-13").innerHTML = "Incorrect!";
      showCorrectAnswer();
    }
    if (document.getElementById("option-14").checked) {
      document.getElementById("block-14").style.border = "3px solid red";
      document.getElementById("result-14").style.color = "red";
      document.getElementById("result-14").innerHTML = "Incorrect!";
      showCorrectAnswer();
    }
  };

  // the functon displays the link to the correct answer
  function showCorrectAnswer() {
    let showAnswer1 = document.createElement("p");
    showAnswer1.innerHTML = "Show Corrent Answer";
    // showAnswer1.style.position = "relative";
    // showAnswer1.style.top = "80px";
    showAnswer1.style.marginTop = "40px";
    showAnswer1.style.fontSize = "1.75rem";
    showAnswer1.style.textAlign = "left";
    showAnswer1.style.cursor = "pointer";
    document.getElementById("showanswer1").appendChild(showAnswer1);
    showAnswer1.addEventListener("click", () => {
      document.getElementById("block-11").style.border = "3px solid limegreen";
      document.getElementById("result-11").style.color = "limegreen";
      document.getElementById("result-11").innerHTML = "Correct!";
      document.getElementById("showanswer1").removeChild(showAnswer1);
    });
  }

  return (
    <div className="body">
      <Header action={"quiz"} />
      <Breadcrumbs subBreadcrumbs={"Quiz"} mainBreadcrumbs={"Home"} />
      <div className="about-sec">
        {/* start quiz */}
        <section id="quiz" className="section-padding">
          <h2>ExpertShala : Quiz </h2>
          <p>
            Online Workshops For Young Minds by Celebrities & Experts Just pick
            your courses & attend live classes
          </p>
          <div className="container container-quiz">
            <div className="row">
              <div className="col-md-12">
                <div className="quizBox">
                  <h3>What fraction of a day is 6 hours?</h3>
                  <p>Choose 1 answer</p>
                  <hr />

                  <div id="block-11" className="block1">
                    <label for="option-11" className="label">
                      <input
                        type="radio"
                        name="option"
                        value="6/24"
                        id="option-11"
                        className="radioBtn"
                      />
                      6/24
                    </label>
                    <span id="result-11"></span>
                  </div>
                  <hr />

                  <div id="block-12" className="block1">
                    <label for="option-12" className="label">
                      <input
                        type="radio"
                        name="option"
                        value="6"
                        id="option-12"
                        className="radioBtn"
                      />
                      6
                    </label>
                    <span id="result-12"></span>
                  </div>
                  <hr />

                  <div id="block-13" className="block1">
                    <label for="option-13" className="label">
                      <input
                        type="radio"
                        name="option"
                        value="1/3"
                        id="option-13"
                        className="radioBtn"
                      />
                      1/3
                    </label>
                    <span id="result-13"></span>
                  </div>
                  <hr />

                  <div id="block-14" className="block1">
                    <label for="option-14" className="label">
                      <input
                        type="radio"
                        name="option"
                        value="1/6"
                        id="option-14"
                        className="radioBtn"
                      />
                      1/6
                    </label>
                    <span id="result-14"></span>
                  </div>
                  <hr />
                  <button
                    type="button"
                    onClick={() => displayAnswer()}
                    className="dispalyBtn"
                  >
                    Submit
                  </button>
                  <span id="showanswer1"></span>
                </div>
              </div>

              <div className="col-md-12">
                <div className="quizBox">
                  <h3>Tell me about your self?</h3>
                  <p>Upload Video</p>
                  <hr />

                  <div id="block-11" className="block1">
                    {!startCam && (
                      <button
                        type="button"
                        onClick={() => startCameraNow()}
                        className="dispalyBtn"
                      >
                        Start Now
                      </button>
                    )}
                  </div>
                  <hr />

                  {startCam && (
                    <React.Fragment>
                      <Webcam
                        forceScreenshotSourceSize={true}
                        screenshotFormat={'image/webp'}
                        videoConstraints={videoConstraints}
                        audio={true}
                        ref={webcamRef}
                      />
                      {capturing ? (
                        <React.Fragment>
                          <button
                            type="button"
                            onClick={() => handleStopCaptureClick()}
                            className="dispalyBtn"
                          >
                            Stop Capture
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button
                            type="button"
                            onClick={() => handleStartCaptureClick()}
                            className="dispalyBtn"
                          >
                            Start Capture
                          </button>
                          <button
                            type="button"
                            onClick={() => closeCamera()}
                            className="dispalyBtn"
                          >
                            Close
                          </button>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}

                  {recordedChunks.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="dispalyBtn"
                    >
                      Download Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end quiz */}
      </div>
      <Footer />
    </div>
  );
}

export default Quiz;
