"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";

const sections = [
  {
    id: "definitions",
    title: "1. Definitions",
    content: (
      <ul className="space-y-3">
        {[
          {
            term: '"Personal Data"',
            definition:
              "Any information relating to an identified or identifiable natural person processed via the Service.",
          },
          {
            term: '"Processing"',
            definition:
              "Any operation performed on Personal Data (collection, storage, analysis, etc.).",
          },
          {
            term: '"Data Subject"',
            definition: "The individual to whom Personal Data relates.",
          },
          {
            term: '"Sub-processor"',
            definition:
              "Third parties engaged by Processor to assist in service delivery.",
          },
          {
            term: '"CCPA"',
            definition: "California Consumer Privacy Act as amended.",
          },
          {
            term: '"Standard Contractual Clauses"',
            definition:
              "The EU Commission's standard clauses for international data transfers.",
          },
        ].map((item, index) => (
          <li key={index} className="flex">
            <span className="font-medium text-blue-500 dark:text-blue-400 mr-2">
              {item.term}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {item.definition}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "roles",
    title: "2. Roles and Responsibilities",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            2.1 Controller Obligations
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Controller warrants that:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "It has obtained all necessary consents from Data Subjects for Processing",
              "Personal Data collection complies with applicable laws",
              "Instructions to Processor comply with data protection laws",
              "It will implement appropriate security measures for its systems",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            2.2 Processor Obligations
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Processor shall:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "Process Personal Data only on documented instructions from Controller",
              "Ensure persons authorized to process data are committed to confidentiality",
              "Implement appropriate technical and organizational measures",
              "Assist Controller in fulfilling data subject rights requests",
              "Notify Controller without undue delay of any data breach",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            2.3 Joint Responsibilities
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Both parties agree to cooperate in good faith to ensure compliance
            with applicable data protection laws and to promptly inform each
            other of any relevant regulatory inquiries.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "processingDetails",
    title: "3. Processing Details",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Nature of Processing
            </h3>
            <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
              {[
                "Chat history storage and analysis",
                "Contact information management",
                "Usage analytics processing",
                "AI model training (where applicable)",
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Categories of Data Subjects
            </h3>
            <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
              {[
                "Chatbot end-users",
                "Controller's employees/agents",
                "Business contacts",
                "Website visitors",
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Types of Personal Data
            </h3>
            <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
              {[
                "Contact information (email, phone)",
                "Chat transcripts",
                "IP addresses",
                "Usage data",
                "Metadata",
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Processing Duration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Personal Data will be processed for the duration of the Service
              agreement, unless otherwise required by law. Data will be deleted
              within 30 days of termination unless retention is legally
              required.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "subprocessing",
    title: "4. Sub-processors",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Controller authorizes Processor to engage the following
          Sub-processors:
        </p>

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
            Infrastructure Providers
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "AWS (Cloud hosting)",
              "Google Cloud (Data storage)",
              "MongoDB Atlas (Database services)",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
            Communication Services
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "Twilio (SMS/voice integration)",
              "SendGrid (Email delivery)",
              "Meta Platforms (WhatsApp integration)",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
            Analytics Services
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "Google Analytics (Usage data)",
              "Amplitude (Product analytics)",
              "Segment (Data collection)",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 dark:text-gray-300">Processor will:</p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "Maintain an up-to-date list of Sub-processors at [URL]",
            "Provide 30 days notice of new Sub-processors (Controller may object on reasonable grounds)",
            "Ensure Sub-processors are bound by equivalent data protection obligations",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    title: "5. Security Measures",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Processor implements and maintains appropriate technical and
          organizational measures to ensure a level of security appropriate to
          the risk:
        </p>

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
            Technical Measures
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "Encryption of data in transit (TLS 1.2+) and at rest (AES-256)",
              "Regular vulnerability scanning and penetration testing",
              "Network security controls (firewalls, IDS/IPS)",
              "Access controls and multi-factor authentication",
              "Data minimization and pseudonymization where possible",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
            Organizational Measures
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-gray-600 dark:text-gray-300">
            {[
              "Data protection policies and employee training",
              "Confidentiality agreements for all personnel",
              "Regular security audits and risk assessments",
              "Incident response management procedures",
              "Business continuity and disaster recovery plans",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          Processor is certified under [ISO 27001/SOC 2] and will provide
          evidence of compliance upon request.
        </p>
      </div>
    ),
  },
  {
    id: "breach",
    title: "6. Data Breach Notification",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          In the event of a Personal Data breach, Processor shall:
        </p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "Notify Controller without undue delay and within 72 hours of becoming aware",
            "Provide detailed information about the breach including nature, categories affected, and approximate number of Data Subjects",
            "Take immediate steps to contain and mitigate the breach",
            "Cooperate with Controller in notifying regulators or Data Subjects where required",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          {`Controller is responsible for determining whether to notify relevant
            supervisory authorities or affected Data Subjects, with Processor's
            assistance as needed.`}
        </p>
      </div>
    ),
  },
  {
    id: "transfers",
    title: "7. International Data Transfers",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Where Personal Data is transferred outside the EEA to countries not
          recognized as providing adequate protection:
        </p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "The parties shall rely on the EU Standard Contractual Clauses (2021 version)",
            "For US transfers, Processor shall maintain compliance with the EU-U.S. Data Privacy Framework",
            "Additional safeguards will be implemented where necessary through technical measures (e.g., encryption)",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          {`Processor's Sub-processors are similarly bound by appropriate
            transfer mechanisms. A list of processing locations is available
            upon request.`}
        </p>
      </div>
    ),
  },
  {
    id: "rights",
    title: "8. Data Subject Rights",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Taking into account the nature of the Processing, Processor shall
          assist Controller in fulfilling its obligations under GDPR Articles
          12-22 by:
        </p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "Providing technical capabilities to access, rectify, or erase Personal Data",
            "Implementing restriction mechanisms upon Controller's instruction",
            "Supporting data portability requests in machine-readable format",
            "Facilitating objection requests where applicable",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          {`Processor will promptly notify Controller of any direct requests
            from Data Subjects and will not respond without Controller's
            authorization unless legally compelled.`}
        </p>
      </div>
    ),
  },
  {
    id: "audit",
    title: "9. Audit Rights",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          {`Controller may request an audit of Processor's compliance with this
            DPA no more than once per year, except where required by supervisory
            authorities:`}
        </p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "Audits must be conducted during business hours with 30 days prior notice",
            "Processor may require confidentiality agreements from auditors",
            "Audit scope must be reasonable and related to Controller's data",
            "Controller bears all audit costs unless material non-compliance is found",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          In lieu of an audit, Processor may provide: (a) recent third-party
          audit reports; (b) attestation from a qualified professional; or (c)
          detailed written responses to security questionnaires.
        </p>
      </div>
    ),
  },
  {
    id: "termination",
    title: "10. Termination and Data Return",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          {`Upon termination of services, at Controller's choice, Processor
            shall:`}
        </p>
        <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
          {[
            "Return all Personal Data in a commonly used, machine-readable format",
            "Securely delete all copies of Personal Data (including backups)",
            "Provide written certification of deletion completion",
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300">
          Retention exceptions: Processor may retain Personal Data where
          required by law, maintaining confidentiality and only processing as
          necessary for the retention purpose.
        </p>
      </div>
    ),
  },
  {
    id: "general",
    title: "11. General Provisions",
    content: (
      <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
        {[
          "This DPA supersedes any prior data processing agreements",
          "Amendments must be in writing and signed by both parties",
          "If any provision is invalid, the remainder remains effective",
          "This DPA is governed by [Governing Law/Jurisdiction]",
          "Notices under this DPA shall be sent to the legal contact points",
        ].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
  },
];
const DataProcessingAgreement = () => {
  const [openSection, setOpenSection] = useState(sections[0].id);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Data Processing Agreement
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-blue-100">
              Effective Date:{" "}
              <span className="font-medium">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            {/*<button className="mt-3 sm:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors">
              Download PDF <FiExternalLink className="inline ml-1" />
            </button>*/}
          </div>
        </div>

        {/* Introduction */}
        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {`This Data Processing Agreement ("DPA") forms part of the Terms of Service between [Your Company Name] ("Processor") and the customer ("Controller") using our SaaS Chatbot Platform ("Service").`}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {`This DPA reflects the parties' commitment to comply with data protection laws including the EU General Data Protection Regulation (GDPR) and other applicable regulations.`}
          </p>
        </div>

        {/* Main Content */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sections.map((section) => (
            <div
              key={section.id}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <button
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  {section.title}
                </h2>
                <span className="text-gray-400 ml-4">
                  {openSection === section.id ? (
                    <FiChevronUp className="h-5 w-5" />
                  ) : (
                    <FiChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              {openSection === section.id && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Controller
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                [To be completed by customer when executing agreement]
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Processor
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>Legal Name: ECODrIx</li>
                <li>Address: Tirupati</li>
                <li>
                  Data Protection Officer:{" "}
                  <span className="text-blue-500 dark:text-blue-400">
                    dpo@ecodrix.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessingAgreement;
