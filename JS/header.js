// Call updateTime() after the new content is loaded
updateTime();

// Optionally, set up the interval for continuous updates
setInterval(updateTime, 1000);

function updateTime() {
    const localDate = getLocalDate();
    document.getElementById('current-date').textContent = localDate;

    const mumbaiTime = getTimePerTimezone('Asia/Kolkata');
    document.getElementById('mumbai').textContent = mumbaiTime;

    const bangkokTime = getTimePerTimezone('Asia/Bangkok');
    document.getElementById('bangkok').textContent = bangkokTime;

    const singaporeTime = getTimePerTimezone('Asia/Singapore');
    document.getElementById('singapore').textContent = singaporeTime;

    const hongkongTime = getTimePerTimezone('Asia/Hong_Kong');
    document.getElementById('hongkong').textContent = hongkongTime;

    const tokyoTime = getTimePerTimezone('Asia/Tokyo')
    document.getElementById('tokyo').textContent = tokyoTime;

    const sydneyTime = getTimePerTimezone('Australia/Sydney')
    document.getElementById('sydney').textContent = sydneyTime;
}

function getLocalDate(){
    const currentDate = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
}

function getTimePerTimezone(timeZone) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZone, ...options });
}