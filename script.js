document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const modal = document.getElementById('registrationModal');
    const triggerBtn = document.getElementById('triggerBtn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('regForm');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const academicLevel = document.getElementById('academicLevel');
    const matricNo = document.getElementById('matricNo');
    const matricError = document.getElementById('matricError');
    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    const departmentSelect = document.getElementById('department');
    const dynamicFields = document.getElementById('dynamicFields');
    const currentYear = new Date().getFullYear();

    // Modal Control
    triggerBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
        resetForm();
    }

    // Toggle Options
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            academicLevel.value = this.dataset.value;
            updateDynamicFields();
            clearValidation();
        });
    });

    // Load Departments
    fetch('departments.json')
        .then(response => response.json())
        .then(data => {
            departmentSelect.innerHTML = '<option value="">Select Department</option>';
            data.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.code;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
        })
        .catch(() => {
            departmentSelect.innerHTML = '<option value="">Department load failed</option>';
        });

    // Dynamic Fields
    function updateDynamicFields() {
        const level = academicLevel.value;
        let html = '';

        if (level === 'undergraduate') {
            html = `
                <div class="input-group">
                    <label for="hostel">Hostel Preference*</label>
                    <select id="hostel" class="modern-select" required>
                        <option value="">Select option</option>
                        <option value="male">Male Hostel</option>
                        <option value="female">Female Hostel</option>
                        <option value="off-campus">Off-Campus</option>
                    </select>
                </div>
            `;
        } else if (level === 'postgraduate') {
            html = `
                <div class="input-group">
                    <label for="lastInstitution">Last Institution Attended*</label>
                    <input type="text" id="lastInstitution" required>
                </div>
            `;
        }

        dynamicFields.innerHTML = html;
    }

    // Validation
    matricNo.addEventListener('input', validateMatric);
    dob.addEventListener('change', validateAge);

    function validateMatric() {
        const level = academicLevel.value;
        const value = matricNo.value.trim();
        let isValid = false;

        if (!value) {
            matricError.textContent = 'Matric number is required';
            return;
        }

        if (level === 'undergraduate') {
            isValid = /^UG\d{8}$/.test(value) && value.includes(currentYear);
            matricError.textContent = isValid ? '' : `Format: UG${currentYear}XXXX`;
        } else if (level === 'postgraduate') {
            isValid = /^PG\d{8}$/.test(value) && value.includes(currentYear);
            matricError.textContent = isValid ? '' : `Format: PG${currentYear}XXXX`;
        }
    }

    function validateAge() {
        const level = academicLevel.value;
        const dobDate = new Date(dob.value);
        
        if (!dob.value) {
            dobError.textContent = 'Date of birth is required';
            return;
        }

        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (level === 'undergraduate' && age >= 25) {
            dobError.textContent = 'Must be under 25 years for undergraduate';
        } else if (level === 'postgraduate' && age < 22) {
            dobError.textContent = 'Must be at least 22 years for postgraduate';
        } else {
            dobError.textContent = '';
        }
    }

    function clearValidation() {
        matricError.textContent = '';
        dobError.textContent = '';
    }

    function resetForm() {
        toggleOptions[0].classList.add('active');
        toggleOptions[1].classList.remove('active');
        academicLevel.value = 'undergraduate';
        dynamicFields.innerHTML = '';
        clearValidation();
    }

    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        validateMatric();
        validateAge();
        
        if (!matricError.textContent && !dobError.textContent) {
            alert('Registration successful!');
            closeModal();
        } else {
            alert('Please correct the errors before submitting.');
        }
    });
});