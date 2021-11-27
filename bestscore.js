function setBestScore(score) {
    localStorage.setItem("bestScore", score);
}

function getBestScore(score) {
    return localStorage.getItem("bestScore");
}

export {setBestScore, getBestScore};