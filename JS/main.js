// FETCHING HEADER AND FOOTER
document.addEventListener('DOMContentLoaded', function() {
    // header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // To make the header sticky and fixed
            window.addEventListener("scroll", function() {
                const selectHeader = document.querySelector("#header.fixed-top");
                const container =  document.querySelector("#header + div") || document.querySelector("#header + section");

                if (selectHeader && container) {
                    if (window.scrollY > 100) {
                        selectHeader.classList.add("sticked");
                        // container.style.marginTop = '240px'; // adjust container margin-top so that it won't be blocked on the first scroll
                    } else {
                        selectHeader.classList.remove("sticked");
                        // container.style.marginTop = "0"; // reset margin-top
                    }
                }
            });

            // Call updateTime() after the new content is loaded
            updateTime();
            
            // Optionally, set up the interval for continuous updates
            setInterval(updateTime, 1000);
        })
        .catch(error => console.error('Error loading header:', error));

    // footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    AOS.init();
    fetchTopReleases();
});

// TIMEZONES
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
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
}

function getTimePerTimezone(timeZone) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZone, ...options });
}

// CAROUSEL
function fetchTopReleases() {
    const apiEndpoint = 'https://www.acnnewswire.com/acnnewswireapi/api/v1/News/EnglishNews'; 

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was NOT OK');
            }
            return response.json();
        })
        .then(data => {
            const topPressReleases = data.slice(2,5); // Get 3 press releases
            console.log(topPressReleases);

            document.getElementById('press-release-image-1').src = topPressReleases[0]?.photo[0]?.bigImage ?? '../Assets/home-page/temp-main-image.png';
            document.getElementById('press-release-image-1').alt = topPressReleases[0]?.headline;
            document.getElementById('press-release-header-1').textContent = topPressReleases[0]?.headline;
            document.getElementById('press-release-summary-1').textContent = topPressReleases[0]?.description.split(/(?<=[.!?])\s/)[0];

            document.getElementById('press-release-image-2').src = topPressReleases[1]?.photo[0]?.bigImage ?? '../Assets/home-page/temp-main-image.png';
            document.getElementById('press-release-image-2').alt = topPressReleases[1]?.headline;
            document.getElementById('press-release-header-2').textContent = topPressReleases[1]?.headline;
            document.getElementById('press-release-summary-2').textContent = topPressReleases[1]?.description.split(/(?<=[.!?])\s/)[0];

            document.getElementById('press-release-image-3').src = topPressReleases[2]?.photo[0]?.bigImage ?? '../Assets/home-page/temp-main-image.png';
            document.getElementById('press-release-image-3').alt = topPressReleases[2]?.headline;
            document.getElementById('press-release-header-3').textContent = topPressReleases[2]?.headline;
            document.getElementById('press-release-summary-3').textContent = topPressReleases[2]?.description.split(/(?<=[.!?])\s/)[0];
        })
        .catch(error => {
            console.error('Error:', error);
        });
}