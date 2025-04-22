# UNILAG Event Registration

## Project Overview
This project is a web-based event registration system designed for UNILAG students. It allows students to register for events by providing their personal and academic details through a multi-step form. The system dynamically validates user inputs and adapts the form based on the selected academic level (Undergraduate or Postgraduate).

##To View the Report In the PDF file Be sure to install (vscode-pdf) extension to be able to view the PDF

## How to Run the Project
1. Install the **Live Server** extension in Visual Studio Code.
2. Open the project folder in Visual Studio Code.
3. Right-click on the `index.html` file and select **Open with Live Server**.
4. The project will open in your default browser, and you can interact with the registration system.

## How to Use
1. Open the `index.html` file in a browser.
2. Click the "Register for Event" button to open the registration modal.
3. Fill in the required fields in the form.
4. Navigate through the steps using the "Next" and "Previous" buttons.
5. Submit the form after completing all required fields.

## Features
- **Multi-Step Form**: A two-step registration form for collecting personal and academic details.
- **Dynamic Form Rendering**: Fields are dynamically displayed based on the selected academic level.
- **Validation**: Real-time validation for matric number, date of birth, and other required fields.
- **Department Loading**: Departments are dynamically loaded from a JSON file.
- **Responsive Design**: The interface is mobile-friendly and adapts to different screen sizes.

## File Structure
- **index.html**: The main HTML file containing the structure of the registration modal and form.
- **style.css**: The CSS file for styling the modal, form, and progress bar.
- **script.js**: The JavaScript file for handling form logic, validation, and dynamic rendering.
- **departments.json**: A JSON file containing the list of departments available for selection.
- **README.md**: This file, providing an overview of the project.
report (PDF)
- **report.PDF**: A PDF file that provides detailed report of the project.
- **.vscode/launch.json**: Configuration for debugging the project in Visual Studio Code.

## Validation Rules
- **Matric Number**:
  - Undergraduate: Format `UG<currentYear><4 digits>` (e.g., `UG20231023`).
  - Postgraduate: Format `PG<currentYear><4 digits>` (e.g., `PG20230987`).
- **Date of Birth**:
  - Undergraduate: Must be younger than 25 years.
  - Postgraduate: Must be at least 22 years old.

## Technologies Used
- HTML, CSS, and JavaScript for the frontend.
- JSON for storing department data.

## Future Enhancements
- Add server-side validation and database integration.
- Implement email notifications for successful registrations.
- Add support for additional academic levels and event types.