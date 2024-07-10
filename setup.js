document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const player1Name = document.getElementById('player1-name').value;
    const player1Nickname = document.getElementById('player1-nickname').value;
    const player2Name = document.getElementById('player2-name').value;
    const player2Nickname = document.getElementById('player2-nickname').value;

    // Check if any field is empty
    if (player1Name === '' || player1Nickname === '' || player2Name === '' || player2Nickname === '') {
        alert('First fill up the details');
        return;
    }

    localStorage.setItem('player1Score', 0);
    localStorage.setItem('player2Score', 0);

    // Clear previous entries from localStorage
    localStorage.removeItem('player1Name');
    localStorage.removeItem('player1Nickname');
    localStorage.removeItem('player2Name');
    localStorage.removeItem('player2Nickname');

    // Set new values in localStorage
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player1Nickname', player1Nickname);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player2Nickname', player2Nickname);

    window.location.href = 'gamepage.html';
});
