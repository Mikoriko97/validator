"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqs = [
    {
      question: "What is blockchain node validation?",
      answer:
        "Blockchain node validation is the process of verifying transactions and adding them to the blockchain. Validators stake tokens as collateral to participate in consensus mechanisms, helping secure the network and process transactions in exchange for rewards.",
    },
    {
      question: "How do I delegate to Unity Nodes?",
      answer:
        "Delegating to Unity Nodes varies by blockchain network. Generally, you'll need to use the network's wallet or staking interface, search for 'UnityNodes' validator, and follow the delegation process. Contact us for specific instructions for your preferred network.",
    },
    {
      question: "What are the rewards for delegating?",
      answer:
        "Staking rewards vary by blockchain network, typically ranging from 5-15% annually. These rewards come from network inflation and transaction fees. UnityNodes charges a competitive commission (usually 5-10%) on rewards earned.",
    },
    {
      question: "Is staking with Unity Nodes secure?",
      answer:
        "Yes, staking with Unity Nodes is secure. We implement enterprise-grade security measures, including HSMs, multi-sig wallets, and 24/7 monitoring. Your delegated tokens remain in your wallet and are never transferred to us.",
    },
    {
      question: "What happens if a node goes offline?",
      answer:
        "If a node goes offline, our monitoring systems alert our team immediately. We have redundant systems and failover mechanisms to minimize downtime. In the rare event of extended downtime, some networks may impose slashing penalties, which we cover through our insurance fund.",
    },
    {
      question: "Can I unstake my tokens at any time?",
      answer:
        "Most networks have an unbonding period (typically 7-28 days) during which your tokens are locked and don't earn rewards. After this period, your tokens become fully liquid again. Check the specific network's unbonding rules for details.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our validation services and staking process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-purple-500/30 rounded-lg bg-black/40 backdrop-blur-sm px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-purple-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
