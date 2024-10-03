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
    
    const id = getPressReleaseId();
    loadPressRelease(id);
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

// GET THE ID
function getPressReleaseId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// LOAD PRESS RELEASE DATA
async function loadPressRelease(id) {
    try {
        const response = await fetch(`https://www.acnnewswire.com/acnnewswireapi/api/v1/News/AllNews`);
        if (!response.ok) {
            throw new Error('Response was NOT OK');
        }
        const data = await response.json();
        const pressRelease = data[id];

        // BREADCRUMBS
        document.getElementById('breadcrumb-pr-title').textContent = pressRelease.headline;
        document.getElementById('pr-source').textContent = pressRelease.source;
        document.getElementById('pr-date').textContent = pressRelease.dateTime;
        document.getElementById('pr-view').textContent = "PLACEHOLDER";

        // HEADLINE SECTION
        document.getElementById('pr-company-logo').src = pressRelease.company_logo ?? '../Assets/placeholder.png';
        document.getElementById('pr-headline').innerHTML = pressRelease.headline;
        document.getElementById('pr-sub-headline').innerHTML = pressRelease.summary;

        // PRESS RELEASE BODY
        const pressReleaseText = pressRelease.description;
        const pressReleaseDateLine = pressReleaseText.match(/^[A-Z][\w\s,]+\(.*?\)/)[0];
        let pressReleaseBody = pressReleaseText.slice(pressReleaseDateLine.length);
        pressReleaseBody = pressReleaseBody.replace(/Copyright\s*©.*?\u003C\/p\s*\/?\u003E/, '');
        const pressReleaseContent = `<strong>${pressReleaseDateLine}</strong> - ${pressReleaseBody}`;
        document.getElementById('pr-body').innerHTML = pressReleaseContent;

        // PRESS RELEASE BODY BOTTOM PART
        document.getElementById('pr-source-bottom').innerHTML = pressRelease.source ?? 'Sample Source';
        document.getElementById('pr-topic').innerHTML = null ?? 'Sample Topic';
        document.getElementById('pr-url').href = pressRelease.url ?? 'https://www.acnnewswire.com';
        document.getElementById('pr-url').innerHTML = pressRelease.url ?? 'Sample URL';
        const pressReleaseSectors = pressRelease.sector;
        document.getElementById('pr-sector').innerHTML = pressReleaseSectors.join(', ') ?? 'Sample Sector';

        // COMPANY CARD
        document.getElementById('pr-company-card-logo').src = pressRelease.company_logo ?? '../Assets/placeholder.png';
        document.getElementById('pr-company-link').innerHTML = pressRelease?.stock[0]?.url ?? 'PLACEHOLDER.COM';
        document.getElementById('pr-company-fb').innerHTML = null ?? ' PLACEHOLDER-FB.COM';
        document.getElementById('pr-company-twitter').innerHTML = null ?? ' PLACEHOLDER-TWITTER.COM';
        document.getElementById('pr-company-linkedin').innerHTML = null ?? ' PLACEHOLDER-LINKEDIN.COM';
        document.getElementById('pr-company-contact-no').innerHTML = null ?? ' 00-00000000-000';
        document.getElementById('pr-company-contact-email').innerHTML = null ?? ' PLACEHOLDER@EMAIL.COM';

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load press release.');
    }
}