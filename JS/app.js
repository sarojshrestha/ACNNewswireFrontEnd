// Calling the header and footer
document.addEventListener('DOMContentLoaded', function() {
    // header
    fetch('new-header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // To make the header sticky and fixed
            window.addEventListener("scroll", function() {
                const selectHeader = document.querySelector("#header.fixed-top");
                const stickyPoint = selectHeader.offsetTop;

                if (selectHeader) {
                    document.addEventListener("scroll", () => {
                    window.scrollY > 50
                        ? selectHeader.classList.add("sticked")
                        : selectHeader.classList.remove("sticked");
                    });
                }
            });

            // Call updateTime() after the new content is loaded
            updateTime();
            
            // Optionally, set up the interval for continuous updates
            setInterval(updateTime, 1000);
        })
        .catch(error => console.error('Error loading header:', error));
    
    // footer
    fetch('new-footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

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
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
}

function getTimePerTimezone(timeZone) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZone, ...options });
}