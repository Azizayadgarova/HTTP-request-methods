document.addEventListener("DOMContentLoaded", () => {
    const userCardsContainer = document.getElementById("user-cards");

    // Function to display skeleton loaders
    const showSkeletons = (count = 6) => {
        userCardsContainer.innerHTML = ""; // Clear existing content
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement("div");
            skeleton.className =
                "bg-white w-80 rounded-lg shadow-lg p-6 flex flex-col items-center text-center animate-pulse";

            skeleton.innerHTML = `
                <div class="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="w-32 h-10 bg-gray-300 rounded"></div>
            `;
            userCardsContainer.appendChild(skeleton);
        }
    };

    // Function to create user card
    const createUserCard = (user) => {
        const card = document.createElement("div");
        card.className =
            "bg-white w-80 rounded-lg shadow-lg p-6 flex flex-col items-center text-center";

        card.innerHTML = `
            <img src="${user.avatar}" alt="${user.username}'s avatar" class="w-24 h-24 rounded-full mb-4">
            <h2 class="text-xl font-bold">${user.username}</h2>
            <p class="text-gray-500 mb-2">📧 ${user.email}</p>
            <p class="text-gray-700">🎂 Age: ${user.age}</p>
            <p class="text-gray-700">📍 ${user.address}</p>
            <p class="text-gray-700 mb-4">🏢 ${user.company}</p>
        `;
        return card;
    };

    // Show skeletons
    showSkeletons();

    // Fetch users from the API
    fetch("http://localhost:5500/users")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((users) => {
            // Clear skeletons
            userCardsContainer.innerHTML = "";

            // Append user cards
            users.forEach((user) => {
                const card = createUserCard(user);
                userCardsContainer.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            userCardsContainer.innerHTML =
                "<p class='text-red-500'>Failed to load user data.</p>";
        });
});
