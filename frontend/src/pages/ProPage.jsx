import Navbar from "@/components/Navbar";
import { CheckIcon, CrownIcon, SparklesIcon, ZapIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with basic AI dental assistance",
    icon: ZapIcon,
    features: [
      "AI Chat Consultations",
      "AI Chatbot Access",
      "Basic Dental Tips",
      "Appointment Booking",
    ],
    highlighted: false,
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "AI Basic",
    price: "₹499",
    period: "/month",
    description: "Enhanced AI features for better dental care",
    icon: SparklesIcon,
    features: [
      "Everything in Free",
      "Priority AI Responses",
      "Dental History Tracking",
      "Personalized Recommendations",
      "Email Support",
    ],
    highlighted: false,
    buttonText: "Coming Soon",
    disabled: true,
  },
  {
    name: "AI Pro",
    price: "₹999",
    period: "/month",
    description: "The ultimate AI dental care experience",
    icon: CrownIcon,
    features: [
      "Everything in Basic",
      "Unlimited Consultations",
      "Advanced AI Diagnostics",
      "Family Account Support",
      "Priority 24/7 Support",
      "Custom Treatment Plans",
    ],
    highlighted: true,
    buttonText: "Coming Soon",
    disabled: true,
  },
];

function ProPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24 min-h-screen animate-fade-in">
        <div className="mb-12 overflow-hidden">
          <div className="flex items-center justify-between bg-gradient-to-br from-primary/10 to-background rounded-3xl p-8 border border-primary/20">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 ">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Upgrade to Pro</span>
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">Unlock Premium AI Dental Care</h1>
                <p className="text-muted-foreground">
                  Get unlimited AI consultations, advanced features, and priority support to take
                  your dental health to the next level.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <CrownIcon className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* PRICING SECTION */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your dental care needs. All plans include secure access
              and bank-level encryption.
            </p>
          </div>

          {/* Custom Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
                    plan.highlighted
                      ? "border-primary/50 bg-gradient-to-b from-primary/10 to-background shadow-lg scale-[1.02]"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlighted ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <Icon className={`w-5 h-5 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>

                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={plan.disabled}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg disabled:opacity-70"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-70"
                    } disabled:cursor-not-allowed`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProPage;
