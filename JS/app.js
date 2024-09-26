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
                const container =  document.querySelector("#header + div");

                if (selectHeader && container) {
                    if (window.scrollY > 50) {
                        selectHeader.classList.add("sticked");
                        container.style.marginTop = '240px'; // adjust container margin-top so that it won't be blocked on the first scroll
                    } else {
                        selectHeader.classList.remove("sticked");
                        container.style.marginTop = "0"; // reset margin-top
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
    fetch('new-footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    AOS.init();
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
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
}

function getTimePerTimezone(timeZone) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZone, ...options });
}


// Some Preparations
// COMPANY DROPDOWN
// Featured Companies
function fetchFeaturedCompanies() {
    const companiesListEndpoint = '<insert sample endpoint here>'; 

    fetch(companiesListEndpoint)
        .then(response => response.json())
        .then(data => {
            let companyList = document.getElementById('featured-companies-list');
            companyList.innerHTML = '';

            data.forEach(company => {
                let companyItem = document.createElement('li');
                let companyLink = document.createElement('a');
                companyLink.href = '#'; // Insert company link here
                companyLink.textContent = company.name; // Company name will be displayed
                companyItem.appendChild(companyLink);
                companyList.appendChild(companyItem);
            });
        })
        .catch(error => {
            console.error('Error fetching featured companies:', error);
        });
}
// First 16 Companies
async function fetchCompanies() {
    try {
        const response = await fetch('<insert list of companies API>');
        const companies = await response.json(); // should be first 16 companies
        const firstCompanies = companies.slice(0, 8);
        const secondCompanies = companies.slice(8);

        const companyList1 = document.getElementById('companies-list-1');
        firstCompanies.forEach(company => {
            let companyItem = document.createElement('li');
            let companyLink = document.createElement('a');
            companyLink.href = '#'; // Insert company link here
            companyLink.textContent = company.name; // Company name will be displayed
            companyItem.appendChild(companyLink);
            companyList1.appendChild(companyItem);
        });

        const companyList2 = document.getElementById('companies-list-2');
        secondCompanies.forEach(company => {
            let companyItem = document.createElement('li');
            let companyLink = document.createElement('a');
            companyLink.href = '#'; // Insert company link here
            companyLink.textContent = company.name; // Company name will be displayed
            companyItem.appendChild(companyLink);
            companyList2.appendChild(companyItem);
        });

    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}