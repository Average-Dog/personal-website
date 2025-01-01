document.getElementById("gb").addEventListener("click", function() {
    window.open("https://github.com/Average-Dog");
});

document.getElementById("lkin").addEventListener("click", function() {
    window.open("https://www.linkedin.com/in/kevin-chen-143732240");
});

document.getElementById("dc").addEventListener("click", function() {
    window.open("https://www.facebook.com/profile.php?id=100090390030443&sk=about");
});

function copyEmail() {
    const email = "chen.yiding023@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Scroll to section and highlight icon and text
document.querySelectorAll('#nav a.nav').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Remove active class from all icons and text
        document.querySelectorAll('#nav img.icon').forEach(icon => {
            icon.classList.remove('active');
        });
        document.querySelectorAll('#nav a.nav').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked icon and text
        this.previousElementSibling.classList.add('active');
        this.classList.add('active');

        // Scroll to the target section
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });

    anchor.addEventListener('mouseover', function() {
        this.previousElementSibling.classList.add('hover');
    });

    anchor.addEventListener('mouseout', function() {
        this.previousElementSibling.classList.remove('hover');
    });
});

// Intersection Observer to detect section in view
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`#nav a.nav[href="#${id}"]`);
            const navIcon = navLink.previousElementSibling;

            // Remove active class from all icons and text
            document.querySelectorAll('#nav img.icon').forEach(icon => {
                icon.classList.remove('active');
            });
            document.querySelectorAll('#nav a.nav').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the current icon and text
            navIcon.classList.add('active');
            navLink.classList.add('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category');
    const pictures = document.querySelectorAll('#pictures div');

    // Display all pictures by default
    pictures.forEach(picture => {
        picture.style.display = 'block';
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.id;

            pictures.forEach(picture => {
                if (category === 'all') {
                    picture.style.display = 'block';
                } else {
                    if (picture.classList.contains(category)) {
                        picture.style.display = 'block';
                    } else {
                        picture.style.display = 'none';
                    }
                }
            });

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category');
    const pictures = document.querySelectorAll('#pictures div');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlideIndex = 0;
    let slides = [];

    // Display all pictures by default
    pictures.forEach(picture => {
        picture.style.display = 'block';
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.id;

            pictures.forEach(picture => {
                if (category === 'all') {
                    picture.style.display = 'block';
                } else {
                    if (picture.classList.contains(category)) {
                        picture.style.display = 'block';
                    } else {
                        picture.style.display = 'none';
                    }
                }
            });

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
        });
    });

    // Add click event to each picture to open the modal
    pictures.forEach((picture, index) => {
        picture.addEventListener('click', () => {
            const pictureId = picture.id;
            slides = Array.from(document.querySelectorAll(`#${pictureId} img, #extra-${pictureId} img`));
            currentSlideIndex = 0; // Start from the first image in the clicked picture
            showSlide(currentSlideIndex);
            modal.style.display = 'block';
        });
    });

    // Show the current slide
    function showSlide(index) {
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        modalImg.src = slides[currentSlideIndex].src;
        captionText.innerHTML = slides[currentSlideIndex].getAttribute('data-description') || slides[currentSlideIndex].alt;
    }

    // Change slide
    window.changeSlide = function(n) {
        showSlide(currentSlideIndex + n);
    };

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'sample-resume.pdf'; // Path to the sample file
    link.download = 'Sample_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}