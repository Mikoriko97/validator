"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { PolicyModal } from "@/components/ui/policy-modal"

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "cookies" | null>(null)

  const closeModal = () => setActiveModal(null)

  return (
    <footer className="bg-gray-950 border-t border-purple-500/20 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">Unity Nodes</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              Professional blockchain node validation services across multiple networks, ensuring security and
              reliability.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://github.com/UnityNodes"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/UnityNodes" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/unitynodesofficial/"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:contact@unitynodes.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://faucet.unitynodes.com/"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Faucet
                </Link>
              </li>
              <li>
                <Link
                  href="https://explorer.unitynodes.com/nibiru-mainnet/staking/nibivaloper1pnacuhw800neg5t3j23ljyrmu5ysdpjplz5ep4"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Staking Services
                </Link>
              </li>
              <li>
                <Link
                  href="https://services.unitynodes.com/"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/governance_unity_bot"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Technical Supports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#partners" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#ecosystems" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Ecosystems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("cookies")}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Unity Nodes. All rights reserved.</p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PolicyModal title="Privacy Policy" isOpen={activeModal === "privacy"} onClose={closeModal}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Unity Nodes Privacy Policy</h3>
          <p>Last Updated: April 15, 2025</p>

          <h4 className="text-lg font-medium text-white mt-6">1. Introduction</h4>
          <p>
            Unity Nodes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you use our blockchain validation services,
            visit our website, or interact with us in any way.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">2. Information We Collect</h4>
          <p>
            <strong>2.1 Personal Information:</strong> We may collect personal information that you voluntarily provide
            to us when you use our services, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact information (name, email address, wallet addresses)</li>
            <li>Account credentials for our services</li>
            <li>Communication records when you contact our support team</li>
            <li>Blockchain transaction data related to staking and delegation</li>
          </ul>

          <p className="mt-4">
            <strong>2.2 Technical Information:</strong> We automatically collect certain information when you visit our
            website or use our services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and settings</li>
            <li>Usage data and interaction with our services</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h4 className="text-lg font-medium text-white mt-6">3. How We Use Your Information</h4>
          <p>We use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining our validation services</li>
            <li>Processing your staking transactions and rewards</li>
            <li>Communicating with you about service updates and changes</li>
            <li>Improving our services and developing new features</li>
            <li>Ensuring the security and integrity of our platform</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h4 className="text-lg font-medium text-white mt-6">4. Data Security</h4>
          <p>
            We implement appropriate technical and organizational measures to protect your information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">5. Third-Party Services</h4>
          <p>
            Our services may integrate with or link to third-party services, including blockchain networks and
            explorers. These third parties have their own privacy policies, and we do not accept responsibility for
            their content or practices.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">6. Your Rights</h4>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accessing and obtaining a copy of your data</li>
            <li>Rectifying inaccurate or incomplete information</li>
            <li>Requesting deletion of your personal information</li>
            <li>Restricting or objecting to certain processing activities</li>
            <li>Data portability</li>
          </ul>

          <h4 className="text-lg font-medium text-white mt-6">7. Changes to This Privacy Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">8. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@unitynodes.com
          </p>
        </div>
      </PolicyModal>

      {/* Terms of Service Modal */}
      <PolicyModal title="Terms of Service" isOpen={activeModal === "terms"} onClose={closeModal}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Unity Nodes Terms of Service</h3>
          <p>Last Updated: April 15, 2025</p>

          <h4 className="text-lg font-medium text-white mt-6">1. Acceptance of Terms</h4>
          <p>
            By accessing or using Unity Nodes' services, website, or any applications made available by Unity Nodes
            (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our Services.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">2. Description of Services</h4>
          <p>
            Unity Nodes provides blockchain node validation services across multiple networks. Our Services include, but
            are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Blockchain node validation and staking services</li>
            <li>Explorer and monitoring tools</li>
            <li>Technical support for delegators</li>
            <li>Educational resources about blockchain validation</li>
          </ul>

          <h4 className="text-lg font-medium text-white mt-6">3. User Responsibilities</h4>
          <p>
            <strong>3.1 Account Security:</strong> If you create an account with us, you are responsible for maintaining
            the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <p className="mt-4">
            <strong>3.2 Accurate Information:</strong> You agree to provide accurate, current, and complete information
            during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mt-4">
            <strong>3.3 Compliance:</strong> You agree to use our Services in compliance with all applicable laws,
            regulations, and these Terms of Service.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">4. Staking and Delegation</h4>
          <p>
            <strong>4.1 Risks:</strong> You acknowledge that staking and delegating crypto assets involves significant
            risks, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Price volatility of crypto assets</li>
            <li>Potential slashing penalties imposed by blockchain networks</li>
            <li>Unbonding/undelegation periods during which assets may be locked</li>
            <li>Smart contract or blockchain protocol risks</li>
          </ul>

          <p className="mt-4">
            <strong>4.2 No Guarantees:</strong> While we strive to provide reliable validation services with high
            uptime, we cannot guarantee:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Specific returns or rewards from staking</li>
            <li>100% uptime or zero slashing events</li>
            <li>The performance or security of third-party blockchain networks</li>
          </ul>

          <h4 className="text-lg font-medium text-white mt-6">5. Fees and Commissions</h4>
          <p>
            Unity Nodes charges a commission on staking rewards as compensation for our validation services. Commission
            rates are clearly displayed on our website and may vary by blockchain network. We reserve the right to
            modify our commission rates with appropriate notice to our users.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">6. Intellectual Property</h4>
          <p>
            All content, features, and functionality of our Services, including but not limited to text, graphics,
            logos, icons, and software, are the exclusive property of Unity Nodes or its licensors and are protected by
            copyright, trademark, and other intellectual property laws.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">7. Limitation of Liability</h4>
          <p>
            To the maximum extent permitted by law, Unity Nodes shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in
            connection with these Terms of Service or your use of the Services.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">8. Modifications to Terms</h4>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant
            changes by posting the updated terms on our website with a new "Last Updated" date. Your continued use of
            the Services after such modifications constitutes your acceptance of the revised terms.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">9. Governing Law</h4>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction],
            without regard to its conflict of law provisions.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">10. Contact Information</h4>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@unitynodes.com
          </p>
        </div>
      </PolicyModal>

      {/* Cookie Policy Modal */}
      <PolicyModal title="Cookie Policy" isOpen={activeModal === "cookies"} onClose={closeModal}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Unity Nodes Cookie Policy</h3>
          <p>Last Updated: April 15, 2025</p>

          <h4 className="text-lg font-medium text-white mt-6">1. Introduction</h4>
          <p>
            This Cookie Policy explains how Unity Nodes ("we," "our," or "us") uses cookies and similar technologies on
            our website and services. By using our website, you consent to the use of cookies as described in this
            policy.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">2. What Are Cookies?</h4>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a
            website. They are widely used to make websites work more efficiently, provide a better user experience, and
            give website owners information about how users interact with their site.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">3. Types of Cookies We Use</h4>
          <p>
            <strong>3.1 Essential Cookies:</strong> These cookies are necessary for the website to function properly.
            They enable core functionality such as security, network management, and account access. You cannot opt out
            of these cookies.
          </p>
          <p className="mt-4">
            <strong>3.2 Performance and Analytics Cookies:</strong> These cookies collect information about how visitors
            use our website, such as which pages they visit most often and if they receive error messages. All
            information collected by these cookies is aggregated and anonymous.
          </p>
          <p className="mt-4">
            <strong>3.3 Functionality Cookies:</strong> These cookies allow the website to remember choices you make
            (such as your username, language, or region) and provide enhanced, personalized features.
          </p>
          <p className="mt-4">
            <strong>3.4 Targeting and Advertising Cookies:</strong> These cookies are used to deliver advertisements
            more relevant to you and your interests. They are also used to limit the number of times you see an
            advertisement and help measure the effectiveness of advertising campaigns.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">4. Third-Party Cookies</h4>
          <p>
            Some cookies are placed by third parties on our website. These third parties may include analytics providers
            (like Google Analytics), social media platforms, and advertising networks. These third-party services are
            governed by their own privacy policies, and we encourage you to review them.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">5. Managing Cookies</h4>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. Here's how to manage
            cookies in common browsers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
            </li>
          </ul>
          <p className="mt-4">
            Please note that restricting cookies may impact your experience on our website, as some features may not
            function properly.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">6. Specific Cookies We Use</h4>
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Purpose</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 px-4 py-2">_ga</td>
                <td className="border border-gray-700 px-4 py-2">Google Analytics - Used to distinguish users</td>
                <td className="border border-gray-700 px-4 py-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">_gid</td>
                <td className="border border-gray-700 px-4 py-2">Google Analytics - Used to distinguish users</td>
                <td className="border border-gray-700 px-4 py-2">24 hours</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">session_id</td>
                <td className="border border-gray-700 px-4 py-2">Maintains user session state</td>
                <td className="border border-gray-700 px-4 py-2">Session</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">preferences</td>
                <td className="border border-gray-700 px-4 py-2">Stores user preferences</td>
                <td className="border border-gray-700 px-4 py-2">1 year</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-lg font-medium text-white mt-6">7. Changes to This Cookie Policy</h4>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
            business practices. Any changes will be posted on this page with an updated "Last Updated" date.
          </p>

          <h4 className="text-lg font-medium text-white mt-6">8. Contact Us</h4>
          <p>
            If you have any questions about our use of cookies, please contact us at:
            <br />
            Email: privacy@unitynodes.com
          </p>
        </div>
      </PolicyModal>
    </footer>
  )
}
