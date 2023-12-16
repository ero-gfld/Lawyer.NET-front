import FaqSectionModel from "@/models/FaqModels/FaqSectionModel";

export const FAQ_CONTENT: ReadonlyArray<FaqSectionModel> = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "How do I sign up?",
        answer:
          'To sign up, click on the "Sign Up" button in the navigation bar.',
      },
      {
        question: "How do I create a user profile?",
        answer:
          "After signing up, you can create a new user profile in your dashboard.",
      },
      {
        question: "How can I contact support?",
        answer:
          "You can reach our support team by sending an email to support@legalsolutions.com.",
      },
    ],
  },
  {
    title: "Appointment Booking",
    faqs: [
      {
        question: "How can I book an appointment?",
        answer:
          "Navigate to the calendar and select an available time slot to book an appointment.",
      },
      {
        question: "Can I cancel an appointment?",
        answer:
          "Yes, you can cancel an appointment by accessing the cancellation option in your dashboard.",
      },
      {
        question: "What do I do if I encounter issues during booking?",
        answer:
          "If you encounter any issues, please contact our support team for assistance.",
      },
    ],
  },
];

export default FAQ_CONTENT;
