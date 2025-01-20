// Function to toggle the navigation menu
function toggleMenu() {
    const links = document.querySelector(".links ul");
    const register = document.querySelector(".register");
  
    if (links && register) {
      links.classList.toggle("active");
      register.classList.toggle("active");
    }
  }

$(document).ready(function () {
    // Define questions for each topic
    const questions = {
        t1: [
            'How do I pay for the notes?',
            'Are there any discounts available for bulk purchases?',
            'Can I use international payment methods like PayPal?',
            'Is there an option to save my payment details for future purchases?',
            'What should I do if my payment fails?',
            'Can I get a refund if I purchased the wrong notes?',
        ],
        t2: [
            'How can I search for notes on a particular programming language or software?',
            'Are the notes categorized by difficulty level (beginner, intermediate, advanced)?',
            'Can I preview the notes before I buy them?',
            'How do I filter the notes by topic or skill?',
            'Are there any free notes available for beginners?',
            'How do I find notes for niche topics that aren\'t listed?',
        ],
        t3: [
            'How do I download the notes after purchasing them?',
            'Are the notes available in formats like PDF or Word?',
            'Can I access my purchased notes on multiple devices?',
            'What if I lose the downloaded file?',
            'Are the notes available offline after downloading?',
            'Can I print the notes after downloading them?',
        ],
        t4: [
            'How do I create an account on the website?',
            'How do I reset my password if I forget it?',
            'Can I update my email address or other personal details?',
            'How do I protect my account from unauthorized access?',
            'What should I do if I notice suspicious activity on my account?',
            'Can I delete my account and data from the website?',
        ],
        t5: [
            'How do I know the notes are up-to-date with the latest information?',
            'Are the notes written by industry experts or professionals?',
            'What makes these notes different from free resources available online?',
            'Can I suggest corrections if I find outdated or incorrect content?',
            'Are there reviews or ratings available for each set of notes?',
            'How do I ensure the content matches my learning goals?',
        ],
        t6: [
            'How can I leave a review or rating for the notes I purchased?',
            'Where can I see reviews from other users about a specific set of notes?',
            'Can I contact the author of the notes for clarification or additional help?',
            'What happens if a note receives consistently negative feedback?',
            'Are there rewards for leaving detailed feedback or reviews?',
            'How does the website ensure that reviews are genuine and not spam?',
        ],
    };

    // Preload all questions into the DOM but keep them hidden
    const $mainQNA = $('.mainQNA');
    Object.keys(questions).forEach(topicClass => {
        questions[topicClass].forEach(question => {
            $mainQNA.append(`
                <a href="#" class="Question ${topicClass}">
                    <i class="fa-regular fa-file"></i>
                    <p>${question}</p>
                </a>
            `);
        });
    });

    // Initially hide all questions
    $('.mainQNA .Question').hide();

    // Display questions for a selected topic
    $('.topic').click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        $('.topic').removeClass('active');
        $(this).addClass('active');

        const topicClass = $(this).attr('class').split(' ')[1];
        $('.mainQNA .Question').hide(); // Hide all questions
        $(`.mainQNA .Question.${topicClass}`).show(); // Show questions for the selected topic
    });

    // Search functionality
    $('.Qinput').on('input', function () {
        const query = $(this).val().toLowerCase();
        $('.mainQNA .Question').hide(); // Hide all questions initially

        if (query) {
            $('.mainQNA .Question').each(function () {
                const questionText = $(this).find('p').text().toLowerCase();
                if (questionText.includes(query)) {
                    $(this).show(); // Show matching questions
                }
            });
        }
    });
});
