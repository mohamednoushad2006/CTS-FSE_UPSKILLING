console.log("Welcome to the Community Portal");

const portalTitle = "Local Community Event Portal";
const communityName = "Local Community";
const launchDate = "2026-06-01";
let availableSeats = 24;

console.log(`${portalTitle} launches active registrations on ${launchDate} with ${availableSeats} seats available.`);

class EventItem {
    constructor({
        id,
        name,
        category,
        location,
        date,
        seats,
        fee,
        image,
        video,
        description,
        lat,
        lon
    }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.location = location;
        this.date = date;
        this.seats = seats;
        this.fee = fee;
        this.image = image;
        this.video = video;
        this.description = description;
        this.lat = lat;
        this.lon = lon;
    }
}

EventItem.prototype.checkAvailability = function checkAvailability() {
    return new Date(this.date) >= new Date(todayISO()) && this.seats > 0;
};

const eventCatalog = [];

function addEvent(eventConfig = {}) {
    const newEvent = new EventItem(eventConfig);
    eventCatalog.push(newEvent);
    return newEvent;
}

const makeRegistrationTracker = (category) => {
    let totalRegistrations = 0;
    return () => {
        totalRegistrations += 1;
        console.log(`${category} registrations so far: ${totalRegistrations}`);
        return totalRegistrations;
    };
};

const categoryTrackers = {
    Music: makeRegistrationTracker("Music"),
    Workshop: makeRegistrationTracker("Workshop"),
    Sports: makeRegistrationTracker("Sports"),
    Food: makeRegistrationTracker("Food"),
    Art: makeRegistrationTracker("Art"),
    Community: makeRegistrationTracker("Community")
};

function filterEventsByCategory(category = "All", callback = (items) => items) {
    const clonedEvents = [...eventCatalog];
    const filtered = category === "All"
        ? clonedEvents
        : clonedEvents.filter((item) => item.category === category);
    return callback(filtered);
}

function registerUser(eventName, userDetails = {}) {
    try {
        const selectedEvent = eventCatalog.find((item) => item.name === eventName);
        if (!selectedEvent) {
            throw new Error("Selected event does not exist.");
        }
        if (!selectedEvent.checkAvailability()) {
            throw new Error("Selected event is unavailable.");
        }
        selectedEvent.seats--;
        availableSeats--;
        const tracker = categoryTrackers[selectedEvent.category];
        if (tracker) {
            tracker();
        }
        console.log(`Registration complete for ${userDetails.name || "Guest"} in ${selectedEvent.name}. Seats left: ${selectedEvent.seats}`);
        return selectedEvent;
    } catch (error) {
        console.error("Registration error:", error.message);
        throw error;
    }
}

addEvent({
    id: 1,
    name: "Music Festival",
    category: "Music",
    location: communityName,
    date: "2026-06-14",
    seats: 12,
    fee: 100,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    video: "vedios/Music festival.mp4",
    description: `Celebrate local bands, food stalls, and cultural performances in the ${communityName} square.`,
    lat: 12.9716,
    lon: 77.5946
});

addEvent({
    id: 2,
    name: "Workshop",
    category: "Workshop",
    location: communityName,
    date: "2026-06-20",
    seats: 8,
    fee: 200,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    video: "vedios/Workshop.mp4",
    description: "Hands-on sessions for skill building, networking, and guided practice.",
    lat: 12.2958,
    lon: 76.6394
});

addEvent({
    id: 3,
    name: "Sports Meet",
    category: "Sports",
    location: communityName,
    date: "2026-06-10",
    seats: 10,
    fee: 150,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop",
    video: "vedios/Sports_community.mp4",
    description: "Community teams compete in athletics, relays, and fun family games.",
    lat: 11.0168,
    lon: 76.9558
});

addEvent({
    id: 4,
    name: "Food Fair",
    category: "Food",
    location: communityName,
    date: "2026-06-18",
    seats: 15,
    fee: 120,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
    video: "vedios/Food fest.mp4",
    description: "Sample neighborhood favorites, chef demos, and local farm produce.",
    lat: 12.9718,
    lon: 77.6412
});

addEvent({
    id: 5,
    name: "Art Exhibition",
    category: "Art",
    location: communityName,
    date: "2026-06-08",
    seats: 0,
    fee: 180,
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&h=400&fit=crop",
    video: "vedios/Art Exhibition.mp4",
    description: "Showcase of paintings, installations, and community-made crafts.",
    lat: 12.9352,
    lon: 77.6245
});

addEvent({
    id: 6,
    name: "Community Meetup",
    category: "Community",
    location: communityName,
    date: "2026-05-10",
    seats: 18,
    fee: 90,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    video: "vedios/Community meet.mp4",
    description: "A social mixer for volunteers, residents, and neighborhood partners.",
    lat: 12.9762,
    lon: 77.6033
});

const musicEventNames = eventCatalog.filter((item) => item.category === "Music").map((item) => item.name);
const displayCardNames = eventCatalog.map(({ name }) => `Workshop on ${name}`);
console.log("Music events:", musicEventNames);
console.log("Mapped display cards:", displayCardNames);
console.log("First event entries:", Object.entries(eventCatalog[0]));
console.log("Framework benefit: React or Vue make state-driven UI updates more predictable than manual DOM wiring.");

function todayISO() {
    return new Date().toISOString().split("T")[0];
}

function ensureUtilityPanel() {
    const eventsSection = document.querySelector("#events");
    if (!eventsSection || document.querySelector("#eventControls")) {
        return {};
    }

    const wrapper = document.createElement("div");
    wrapper.id = "eventControls";
    wrapper.className = "info-card";
    wrapper.style.marginTop = "20px";

    wrapper.innerHTML = `
        <h3>Browse Events</h3>
        <p>Use the filters below to explore live community events.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-top:12px;">
            <div>
                <label for="categoryFilter">Category</label>
                <select id="categoryFilter">
                    <option value="All">All Categories</option>
                    <option value="Music">Music</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Sports">Sports</option>
                    <option value="Food">Food</option>
                    <option value="Art">Art</option>
                    <option value="Community">Community</option>
                </select>
            </div>
            <div>
                <label for="searchInput">Quick Search</label>
                <input id="searchInput" type="text" placeholder="Type an event name">
            </div>
        </div>
        <p id="eventStatusMessage" style="margin-top:12px;"></p>
        <div id="loadingSpinner" class="visibility-hidden-example" style="margin-top:10px;">Loading events...</div>
        <div id="eventsGrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-top:16px;"></div>
        <div id="debugLog" style="margin-top:16px; padding:12px; background:rgba(16,35,61,0.06); border-radius:12px; font-family:monospace;"></div>
    `;

    eventsSection.appendChild(wrapper);
    return {
        categoryFilter: document.querySelector("#categoryFilter"),
        searchInput: document.querySelector("#searchInput"),
        eventsGrid: document.querySelector("#eventsGrid"),
        eventStatusMessage: document.querySelector("#eventStatusMessage"),
        loadingSpinner: document.querySelector("#loadingSpinner"),
        debugLog: document.querySelector("#debugLog")
    };
}

function formatEventCard({ name }) {
    return `Workshop on ${name}`;
}

function renderEventCards(eventsToRender, target) {
    if (!target) {
        return;
    }
    target.innerHTML = "";

    eventsToRender.forEach((eventItem) => {
        const card = document.createElement("article");
        card.className = "eventCard";
        card.dataset.eventName = eventItem.name;

        const title = document.createElement("h3");
        title.textContent = eventItem.name;

        const details = document.createElement("p");
        details.textContent = `${eventItem.category} | ${eventItem.location} | ${eventItem.date}`;

        const summary = document.createElement("p");
        summary.textContent = `${formatEventCard(eventItem)} - ${eventItem.description}`;

        const seatInfo = document.createElement("p");
        seatInfo.textContent = `Seats left: ${eventItem.seats}`;

        const registerBtn = document.createElement("button");
        registerBtn.id = eventItem.name === "Music Festival" ? "registerBtn" : "";
        registerBtn.textContent = "Register";
        registerBtn.onclick = () => handlePortalRegistration(eventItem.name);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.marginLeft = "8px";
        cancelBtn.onclick = () => cancelRegistration(eventItem.name);

        card.append(title, details, summary, seatInfo, registerBtn, cancelBtn);
        target.appendChild(card);
    });
}

function hideInvalidEvents(eventsToValidate) {
    return eventsToValidate.filter((eventItem) => {
        if (eventItem.checkAvailability()) {
            return true;
        }
        console.log(`Hidden event: ${eventItem.name} (past date or full seats)`);
        return false;
    });
}

function updateRegistrationSelect() {
    const eventSelect = document.querySelector("#eventTypeSelect");
    if (!eventSelect) {
        return;
    }

    const currentValue = eventSelect.value;
    const openEvents = hideInvalidEvents(eventCatalog);

    eventSelect.innerHTML = '<option value="">Select Event Type</option>';
    openEvents.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name;
        eventSelect.appendChild(option);
    });

    if (openEvents.some((item) => item.name === currentValue)) {
        eventSelect.value = currentValue;
    }
}

function updateFee(selectedName = "") {
    const feeOutput = document.querySelector("#fee");
    const selectedEvent = eventCatalog.find((item) => item.name === selectedName);
    if (feeOutput) {
        feeOutput.textContent = selectedEvent ? `Event Fee: Rs ${selectedEvent.fee}` : "";
    }
}

function updatePreview(eventName = "") {
    const previewDiv = document.querySelector("#eventPreview");
    const previewImg = document.querySelector("#eventPreviewImg");
    const promoVideo = document.querySelector("#promoVideo");
    const promoSource = document.querySelector("#promoSource");

    const selectedEvent = eventCatalog.find((item) => item.name === eventName);
    if (!previewDiv || !selectedEvent) {
        if (previewDiv) {
            previewDiv.style.display = "none";
        }
        return;
    }

    previewImg.src = selectedEvent.image;
    promoSource.src = selectedEvent.video;
    promoVideo.load();
    previewDiv.style.display = "block";
}

function validatePhone(input) {
    const phone = input.value.trim();
    console.log("Validating phone number:", phone);
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Invalid phone number (must be 10 digits)");
        return false;
    }
    return true;
}

function countChars(textarea, targetId) {
    const target = document.querySelector(`#${targetId}`);
    if (target) {
        target.textContent = `${textarea.value.length} characters`;
    }
}

function enlargeImage(img) {
    img.style.width = img.style.width === "300px" ? "220px" : "300px";
}

function videoReady() {
    const videoStatus = document.querySelector("#videoStatus");
    if (videoStatus) {
        videoStatus.textContent = "Video ready to play";
    }
}

function setFormError(field, message = "") {
    const existing = field.parentElement.querySelector(".inline-error");
    if (existing) {
        existing.remove();
    }
    if (!message) {
        return;
    }
    const error = document.createElement("small");
    error.className = "inline-error";
    error.style.color = "#c62828";
    error.textContent = message;
    field.parentElement.appendChild(error);
}

function validateRegistrationForm(form) {
    const { name, email, eventTypeSelect } = form.elements;
    let valid = true;

    setFormError(name);
    setFormError(email);
    setFormError(eventTypeSelect);

    if (!name.value.trim()) {
        setFormError(name, "Please enter your name.");
        valid = false;
    }

    if (!email.value.includes("@")) {
        setFormError(email, "Please enter a valid email.");
        valid = false;
    }

    if (!eventTypeSelect.value) {
        setFormError(eventTypeSelect, "Please select an event.");
        valid = false;
    }

    return valid;
}

function cancelRegistration(eventName) {
    const selectedEvent = eventCatalog.find((item) => item.name === eventName);
    if (!selectedEvent) {
        return;
    }
    selectedEvent.seats++;
    availableSeats++;
    refreshRenderedEvents();
    updateRegistrationSelect();
    updateFee(document.querySelector("#eventTypeSelect")?.value || "");
    const output = document.querySelector("#msg");
    if (output) {
        output.value = `Registration canceled for ${eventName}.`;
    }
}

function logDebugStep(message, payload = {}) {
    console.log(message, payload);
    const debugLog = document.querySelector("#debugLog");
    if (debugLog) {
        debugLog.textContent = `${message} ${JSON.stringify(payload, null, 2)}`;
    }
}

function simulatePostRegistration(payload) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!payload.email) {
                reject(new Error("Missing email in payload."));
                return;
            }
            resolve({
                ok: true,
                status: 201,
                payload
            });
        }, 900);
    });
}

function postRegistration(payload) {
    logDebugStep("Submitting registration payload", payload);
    return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.warn("Remote POST failed, using simulated response.", error.message);
            return simulatePostRegistration(payload);
        });
}

async function fetchEventsAsync(spinner) {
    try {
        if (spinner) {
            spinner.className = "";
            spinner.textContent = "Loading events...";
        }
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const apiEvents = await response.json();
        console.log("Async/await events fetch success:", apiEvents.length);
        return apiEvents;
    } catch (error) {
        console.warn("Async fetch fallback:", error.message);
        return eventCatalog;
    } finally {
        if (spinner) {
            spinner.className = "display-none-example";
        }
    }
}

function fetchEventsThenCatch() {
    return fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
        .then((response) => response.json())
        .then((items) => {
            console.log("Promise fetch success:", items.length);
            return items;
        })
        .catch((error) => {
            console.warn("Promise fetch fallback:", error.message);
            return [];
        });
}

function handlePortalRegistration(eventName) {
    const form = document.querySelector("#registrationForm");
    const fallbackName = form?.elements?.name?.value?.trim() || "Community Member";
    const fallbackEmail = form?.elements?.email?.value?.trim() || "member@example.com";

    try {
        registerUser(eventName, { name: fallbackName, email: fallbackEmail });
        refreshRenderedEvents();
        updateRegistrationSelect();
        updateFee(document.querySelector("#eventTypeSelect")?.value || "");
        updatePreview(eventName);
        const output = document.querySelector("#msg");
        if (output) {
            output.value = `Registration Successful for ${eventName}!`;
        }
    } catch (error) {
        const output = document.querySelector("#msg");
        if (output) {
            output.value = error.message;
        }
    }
}

function applyFilters(searchTerm = "", category = "All") {
    return filterEventsByCategory(category, (items) => {
        return hideInvalidEvents(items).filter((eventItem) => {
            const normalized = searchTerm.trim().toLowerCase();
            return !normalized || eventItem.name.toLowerCase().includes(normalized);
        });
    });
}

function refreshRenderedEvents() {
    const grid = document.querySelector("#eventsGrid");
    const statusMessage = document.querySelector("#eventStatusMessage");
    const categoryValue = document.querySelector("#categoryFilter")?.value || "All";
    const searchValue = document.querySelector("#searchInput")?.value || "";
    const filteredEvents = applyFilters(searchValue, categoryValue);

    renderEventCards(filteredEvents, grid);

    if (statusMessage) {
        statusMessage.textContent = `${filteredEvents.length} event(s) available.`;
    }
}

function showPageLoadedAlert() {
    alert("Community Portal loaded successfully.");
}

function wireLegacyCallbacks() {
    window.validatePhone = validatePhone;
    window.showFee = (select) => {
        updateFee(select.value);
        updatePreview(select.value);
    };
    window.confirmSubmit = () => {
        const form = document.querySelector("#registrationForm");
        if (form) {
            form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    };
    window.enlargeImage = enlargeImage;
    window.countChars = countChars;
    window.videoReady = videoReady;
    window.updatePreview = updatePreview;
}

function wireFeedbackForm() {
    const fbForm = document.querySelector("#feedbackForm");
    if (!fbForm) {
        return;
    }

    fbForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.querySelector("#fbName").value || "Anonymous";
        const rating = document.querySelector("#fbRating").value;
        const message = document.querySelector("#fbMessage").value || "";
        const fbAck = document.querySelector("#fbAck");

        try {
            const allFeedback = JSON.parse(localStorage.getItem("feedbacks") || "[]");
            allFeedback.push({ name, rating, message, ts: Date.now() });
            localStorage.setItem("feedbacks", JSON.stringify(allFeedback));
            if (fbAck) {
                fbAck.textContent = "Thanks for your feedback!";
            }
            fbForm.reset();
            countChars({ value: "" }, "feedbackCharCount");
        } catch (error) {
            if (fbAck) {
                fbAck.textContent = "Error saving feedback.";
            }
            console.error("Feedback error:", error);
        }
    });
}

function wireGeolocation() {
    const findBtn = document.querySelector("#findNearbyBtn");
    const geoStatus = document.querySelector("#geoStatus");
    const coordsOut = document.querySelector("#coords");
    const nearestOut = document.querySelector("#nearestEvent");

    const toRad = (deg) => deg * Math.PI / 180;
    const haversine = (lat1, lon1, lat2, lon2) => {
        const radius = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return radius * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };

    const findNearest = (lat, lon) => {
        let best = null;
        eventCatalog.forEach((item) => {
            if (typeof item.lat !== "number" || typeof item.lon !== "number") {
                return;
            }
            const distance = haversine(lat, lon, item.lat, item.lon);
            if (!best || distance < best.distance) {
                best = { event: item, distance };
            }
        });
        return best;
    };

    if (!findBtn) {
        return;
    }

    findBtn.addEventListener("click", () => {
        if (!("geolocation" in navigator)) {
            geoStatus.textContent = "Geolocation not supported by your browser.";
            return;
        }

        geoStatus.textContent = "Requesting location...";
        coordsOut.textContent = "";
        nearestOut.textContent = "";
        findBtn.disabled = true;

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            coordsOut.textContent = `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            geoStatus.textContent = "Location found";

            const nearest = findNearest(latitude, longitude);
            if (nearest) {
                nearestOut.textContent = `Nearest event: ${nearest.event.name} (${nearest.distance.toFixed(2)} km)`;
            }
            findBtn.disabled = false;
        }, (error) => {
            geoStatus.textContent = error.message || "Location unavailable.";
            findBtn.disabled = false;
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    });
}

function wireRegistrationForm() {
    const form = document.querySelector("#registrationForm");
    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        logDebugStep("Form submit started", {
            name: form.elements.name.value,
            email: form.elements.email.value,
            eventName: form.elements.eventTypeSelect.value
        });

        if (!validateRegistrationForm(form) || !validatePhone(form.elements.phone)) {
            return;
        }

        const payload = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            eventName: form.elements.eventTypeSelect.value,
            message: form.elements.message.value.trim()
        };

        try {
            handlePortalRegistration(payload.eventName);
            const result = await postRegistration(payload);
            const output = document.querySelector("#msg");
            if (output) {
                output.value = result.ok === true || result.id ? "Registration sent successfully." : "Registration stored locally.";
            }
        } catch (error) {
            const output = document.querySelector("#msg");
            if (output) {
                output.value = `Registration failed: ${error.message}`;
            }
        }
    });
}

function wireSearchAndFilters() {
    const controls = ensureUtilityPanel();
    const { categoryFilter, searchInput, eventsGrid, loadingSpinner } = controls;

    if (!eventsGrid) {
        return;
    }

    if (categoryFilter) {
        categoryFilter.onchange = () => {
            refreshRenderedEvents();
        };
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", () => {
            refreshRenderedEvents();
        });
    }

    fetchEventsThenCatch();
    fetchEventsAsync(loadingSpinner);
    refreshRenderedEvents();
}

function wirePreferenceStorage() {
    const eventSelect = document.querySelector("#eventTypeSelect");
    const clearBtn = document.querySelector("#clearPrefsBtn");

    if (eventSelect) {
        const preferredEvent = localStorage.getItem("preferredEvent");
        if (preferredEvent) {
            eventSelect.value = preferredEvent;
            updateFee(preferredEvent);
            updatePreview(preferredEvent);
        }

        eventSelect.addEventListener("change", () => {
            const { value } = eventSelect;
            if (value) {
                localStorage.setItem("preferredEvent", value);
                sessionStorage.setItem("lastSelected", value);
            } else {
                localStorage.removeItem("preferredEvent");
                sessionStorage.removeItem("lastSelected");
            }
            updateFee(value);
            updatePreview(value);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            localStorage.removeItem("preferredEvent");
            sessionStorage.clear();
            if (eventSelect) {
                eventSelect.value = "";
            }
            updateFee("");
            const status = document.querySelector("#videoStatus");
            if (status) {
                status.textContent = "";
            }
            alert("Preferences cleared (localStorage and sessionStorage).");
        });
    }
}

function wireDirtyFormWarning() {
    const form = document.querySelector("#registrationForm");
    if (!form) {
        return;
    }

    let isDirty = false;
    form.addEventListener("input", () => {
        isDirty = true;
    });

    window.addEventListener("beforeunload", (event) => {
        if (!isDirty) {
            return;
        }
        event.preventDefault();
        event.returnValue = "";
    });

    window.__registrationIsDirty = (value) => {
        isDirty = value;
    };
}

function wireJQueryExample() {
    if (!window.jQuery) {
        console.log("jQuery example available in main.js; library not loaded, so native JS remains active.");
        return;
    }

    window.jQuery("#registerBtn").click(() => {
        window.jQuery("#eventsGrid .eventCard").fadeOut(150).fadeIn(150);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showPageLoadedAlert();
    wireLegacyCallbacks();
    updateRegistrationSelect();
    wireRegistrationForm();
    wirePreferenceStorage();
    wireDirtyFormWarning();
    wireFeedbackForm();
    wireGeolocation();
    wireSearchAndFilters();
    wireJQueryExample();
});
