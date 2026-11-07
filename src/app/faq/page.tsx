import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "./FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with Team Oreo.",
  alternates: { canonical: "/faq" },
};

const faqItems = [
  { question: "How long does software development take?", answer: "We cannot possibly answer this question precisely because there are projects finished in 2 to 3 weeks, but there are also tasks that take several years to complete. To provide you with a precise answer, we have to evaluate the project complexity and the work scope. Knowing this information, we can provide you with the estimated time frame." },
  { question: "Should I be familiar with the technical details to work with you?", answer: "There is absolutely no need for this. You do not have to be an expert in software development because we are. We are ready to explain any unclear moments and the essence of all stages while working on the project. All you need is a clear vision of what objectives you want to achieve using the desired software product. We will help you make them a reality." },
  { question: "What information do you need from me to start work?", answer: "Share the details of your project – like scope, timeframes, or business challenges you’d like to solve." },
  { question: "Do you provide product support services after the app development is complete?", answer: "Yes, we are always glad to provide technical support and service the apps we have developed. We can also further develop your software product if you need to implement new features or integrate third-party services." },
  { question: "I need an app for iOS and Android. Which platform is better to start with?", answer: "Which platform you should choose depends solely on the future application idea as well as its target audience. Each platform has its own monetization model. Apple users spend more money on paid apps and in-app purchases. If the goal is direct monetization, then iOS should be chosen. There are more Android users; however, they are less likely to pay for app installation and prefer free applications. We highly recommend starting with only one platform or building a cross-platform application. This will speed up launching the project, help assess its weaknesses, and save money and time." },
  { question: "Will you sign an NDA?", answer: "Yes, sure. If you want to sign an NDA, we are always ready to do so." },
  { question: "Where are your company's office and employees located?", answer: "Our headquarters and 100% of our employees are located in London, United Kingdom (which is one of the most dynamic IT centers in Western Europe)." },
  { question: "How big is your team?", answer: "We have more than 30 specialists with diverse experience in different industries and products of various complexity. There are Software development department, Project management office, Quality assurance and Business analytics department, Recruitment & HR, and an internal team offering account and legal support." },
  { question: "What is Agile software development?", answer: "Agile software development is a combination of iterative and incremental process models with focus on process adaptability and customer satisfaction by rapid delivery of working software product. Agile methods break the product into small incremental builds. These builds are provided in fortnightly iterations." },
  { question: "Do you provide system documentation?", answer: "We provide the SRS documentation to the client. The code will have comments to facilitate easy comprehension. Our documentation is comprehensive and self-explanatory." },
  { question: "How do I create a product with you?", answer: "If you have an idea, contact us by our online form, e-mail or phone. We'll meet and talk it over. Be sure to prepare as much information about your idea as possible; it will smoothen the meeting and benefit further cooperation. If you don't know how to get around to it, read our blog entry on how to write a project brief." },
  { question: "How do you handle change requests from your customers?", answer: "We have a standard procedure for handling change requests from our customers. Firstly, we seek their approval for any change request. After the customer approves the request, we do an impact analysis. This allows us to deliver timelines and cost estimates to the customer. Once the customer approves the estimates, we implement the changes." },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-20 sm:py-24">
          <p className="eyebrow text-brand">FAQ</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Frequently asked questions</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">Helpful answers about working with Team Oreo.</p>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="mb-10 text-sm text-muted"><span>Home</span><span className="mx-3 text-brand">/</span><span className="font-semibold text-brand">FAQ</span></div>
          <FAQAccordion items={faqItems} />
        </Container>
      </section>
    </>
  );
}
