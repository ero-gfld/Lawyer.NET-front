<template>
    <div class="container mx-auto p-14 bg-gray-100">
      <h1 class="text-4xl font-bold mb-8">Help and Support</h1>
  
      <!-- FAQ Sections -->
      <div v-for="(faqSection, index) in faqSections" :key="index" class="mb-8 bg-white p-10 rounded-lg shadow-md w-3/4">
        <h2 class="text-3xl font-semibold text-blue-600 mb-4">{{ faqSection.title }}</h2>
        
        <!-- Individual FAQs -->
        <div v-for="(faq, faqIndex) in faqSection.faqs" :key="faqIndex" class="mb-6">
          <h3 class="text-lg font-medium mb-2">{{ faq.question }}</h3>
          <p class="text-gray-800">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        faqSections: [
          {
            title: 'General Questions',
            faqs: [
              { question: 'How do I sign up?', answer: 'To sign up, click on the "Sign Up" button in the navigation bar.' },
              { question: 'How do I create a user profile?', answer: 'After signing up, you can create a new user profile in your dashboard.' },
              { question: 'How can I contact support?', answer: 'You can reach our support team by sending an email to support@legalsolutions.com.'}
            ],
          },
          {
            title: 'Appointment Booking',
            faqs: [
              { question: 'How can I book an appointment?', answer: 'Navigate to the calendar and select an available time slot to book an appointment.' },
              { question: 'Can I cancel an appointment?', answer: 'Yes, you can cancel an appointment by accessing the cancellation option in your dashboard.' },
              { question: 'What do I do if I encounter issues during booking?', answer: 'If you encounter any issues, please contact our support team for assistance.'}
            ],
          },
        ],
      };
    },
  };
</script>
  