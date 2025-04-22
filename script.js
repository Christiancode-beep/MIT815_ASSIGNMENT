document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('registrationModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.close');
    
    // Form elements
    const form = document.getElementById('registrationForm');
    const academicLevel = document.getElementById('academicLevel');
    const matricNo = document.getElementById('matricNo');
    const matricError = document.getElementById('matricError');
    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    const departmentSelect = document.getElementById('department');
    const ugFields = document.getElementById('ugFields');
    const pgFields = document.getElementById('pgFields');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-bar .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    
    // Current year for validation
    const currentYear = new Date().getFullYear();
    
    // Modal functionality
    openBtn.addEventListener('click', () => modal.style.display = 'block');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    // Load departments from JSON
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
        .catch(error => {
            console.error('Error loading departments:', error);
            departmentSelect.innerHTML = '<option value="">Error loading departments</option>';
        });
    
    // Dynamic form rendering based on academic level
    academicLevel.addEventListener('change', function() {
        const level = this.value;
        
        // Hide all academic fields first
        ugFields.classList.add('hidden');
        pgFields.classList.add('hidden');
        
        // Show relevant fields
        if (level === 'undergraduate') {
            ugFields.classList.remove('hidden');
        } else if (level === 'postgraduate') {
            pgFields.classList.remove('hidden');
        }
        
        // Clear matric number and validation when level changes
        matricNo.value = '';
        matricError.textContent = '';
    });
    
    // Matric number validation
    matricNo.addEventListener('blur', function() {
        const level = academicLevel.value;
        const matricValue = this.value.trim();
        
        if (!level) {
            matricError.textContent = 'Please select academic level first';
            return;
        }
        
        if (!matricValue) {
            matricError.textContent = 'Matric number is required';
            return;
        }
        
        let isValid = false;
        const yearPattern = currentYear.toString();
        
        if (level === 'undergraduate') {
            const ugRegex = new RegExp(`^UG${yearPattern}\\d{4}$`);
            isValid = ugRegex.test(matricValue);
            if (!isValid) {
                matricError.textContent = `Undergraduate format: UG${currentYear} followed by 4 digits (e.g., UG${currentYear}1023)`;
            }
        } else if (level === 'postgraduate') {
            const pgRegex = new RegExp(`^PG${yearPattern}\\d{4}$`);
            isValid = pgRegex.test(matricValue);
            if (!isValid) {
                matricError.textContent = `Postgraduate format: PG${currentYear} followed by 4 digits (e.g., PG${currentYear}0987)`;
            }
        }
        
        if (isValid) {
            matricError.textContent = '';
        }
    });
    
    // Date of Birth validation
    dob.addEventListener('change', function() {
        const level = academicLevel.value;
        const dobValue = new Date(this.value);
        const today = new Date();
        
        if (!level) {
            dobError.textContent = 'Please select academic level first';
            return;
        }
        
        if (!this.value) {
            dobError.textContent = 'Date of birth is required';
            return;
        }
        
        let age = today.getFullYear() - dobValue.getFullYear();
        const monthDiff = today.getMonth() - dobValue.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
            age--;
        }
        
        if (level === 'undergraduate' && age >= 25) {
            dobError.textContent = 'Undergraduate students must be younger than 25';
        } else if (level === 'postgraduate' && age < 22) {
            dobError.textContent = 'Postgraduate students must be at least 22 years old';
        } else {
            dobError.textContent = '';
        }
    });
    
    // Multi-step form navigation
    let currentStep = 1;
    
    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === step);
        });
        
        progressSteps.forEach((progressStep, index) => {
            progressStep.classList.toggle('active', index + 1 <= step);
        });
        
        currentStep = step;
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });
    
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            // Validate all step 1 fields
            if (!academicLevel.value) {
                alert('Please select your academic level');
                isValid = false;
            }
            
            if (!matricNo.value.trim()) {
                alert('Matric number is required');
                isValid = false;
            } else if (matricError.textContent) {
                alert('Please fix matric number errors');
                isValid = false;
            }
            
            if (!fullName.value.trim()) {
                alert('Full name is required');
                isValid = false;
            }
            
            if (!dob.value) {
                alert('Date of birth is required');
                isValid = false;
            } else if (dobError.textContent) {
                alert('Please fix date of birth errors');
                isValid = false;
            }
            
            if (!departmentSelect.value) {
                alert('Please select your department');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // For PG students, validate last institution
            if (academicLevel.value === 'postgraduate' && !lastInstitution.value.trim()) {
                alert('Last institution attended is required for postgraduate students');
                return;
            }
            
            // Form is valid - process submission
            alert('Registration submitted successfully!');
            modal.style.display = 'none';
            form.reset();
            showStep(1);
        }
    });
});