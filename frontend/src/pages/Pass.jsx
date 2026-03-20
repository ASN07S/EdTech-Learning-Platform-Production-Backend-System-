import { useState } from "react";

function Pass() {
  const [activeTab, setActiveTab] = useState("pro");
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const plans = {
    monthly: 599,
    yearly: 649,
    eighteen: 799,
  };

  const applyCoupon = () => {
    if (coupon === "MOCK50") {
      setDiscount(50);
    } else if (coupon === "PRO100") {
      setDiscount(100);
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const totalPrice = plans[selectedPlan];
  const finalPrice = totalPrice - discount;

  const theme =
    activeTab === "pro"
      ? {
          bg: "bg-yellow-50",
          btn: "bg-yellow-500 hover:bg-yellow-600",
          highlight: "border-yellow-500 shadow-lg",
          accent: "text-yellow-600",
        }
      : {
          bg: "bg-blue-50",
          btn: "bg-blue-600 hover:bg-blue-700",
          highlight: "border-blue-600 shadow-lg",
          accent: "text-blue-600",
        };

  return (
    <div className={`max-w-6xl mx-auto p-6 rounded-2xl ${theme.bg}`}>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Upgrade Your Preparation 🚀
      </h1>
      <p className="text-gray-600 mb-8">
        Choose the perfect plan to boost your preparation.
      </p>

      {/* TABS */}
      <div className="flex bg-gray-200 rounded-xl p-1 w-fit mb-10">
        <button
          onClick={() => setActiveTab("pro")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "pro"
              ? "bg-yellow-400 text-black"
              : "text-gray-600"
          }`}
        >
          Pass Pro ⭐ Suggested
        </button>

        <button
          onClick={() => setActiveTab("basic")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "basic"
              ? "bg-blue-600 text-white"
              : "text-gray-600"
          }`}
        >
          Pass
        </button>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {Object.entries(plans).map(([key, price]) => (
          <div
            key={key}
            onClick={() => setSelectedPlan(key)}
            className={`p-6 rounded-2xl border cursor-pointer transition ${
              selectedPlan === key
                ? theme.highlight
                : "border-gray-200"
            }`}
          >
            <h3 className="font-semibold text-lg capitalize">
              {key === "eighteen" ? "18 Months Plan" : `${key} Plan`}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Valid for{" "}
              {key === "monthly"
                ? "30"
                : key === "yearly"
                ? "365"
                : "548"}{" "}
              Days
            </p>
            <p className="text-3xl font-bold">₹{price}</p>
          </div>
        ))}
      </div>

      {/* COUPON */}
      <div className="bg-white p-6 rounded-2xl mb-8 shadow-sm">
        <h3 className="font-semibold mb-4">Apply Coupon</h3>
        <div className="flex gap-4">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="border px-4 py-2 rounded-lg flex-1"
          />
          <button
            onClick={applyCoupon}
            className={`${theme.btn} text-white px-6 py-2 rounded-lg transition`}
          >
            Apply
          </button>
        </div>
      </div>

      {/* PRICE SUMMARY */}
      <div className="bg-white p-6 rounded-2xl mb-10 shadow-sm">
        <h3 className="font-semibold mb-4">Price Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Original Price</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between mb-2 text-green-600">
          <span>Discount</span>
          <span>- ₹{discount}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>To Pay</span>
          <span className={theme.accent}>₹{finalPrice}</span>
        </div>
      </div>

      {/* FEATURE COMPARISON */}
      <div className="bg-white p-6 rounded-2xl mb-12 shadow-sm">
        <h3 className="font-semibold mb-6 text-xl">
          Feature Comparison
        </h3>

        <div className="grid grid-cols-3 gap-4 font-medium text-gray-600 mb-4">
          <div>Features</div>
          <div>Pass</div>
          <div className={theme.accent}>Pass Pro</div>
        </div>

        {[
          "Mock Tests",
          "Live Tests",
          "Practice Questions",
          "Previous Year Papers",
          "Unlimited Re-attempts",
        ].map((feature) => (
          <div
            key={feature}
            className="grid grid-cols-3 gap-4 py-2 border-t"
          >
            <div>{feature}</div>
            <div className="text-center">✔</div>
            <div className={`text-center font-bold ${theme.accent}`}>
              ✔
            </div>
          </div>
        ))}
      </div>

      {/* NOT INCLUDED SECTION */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">
            This subscription does not include these individual goals –
          </h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            {[
              "UPSC",
              "UGC",
              "CAT",
              "Judiciary",
              "CLAT",
              "NEET",
              "RBI Grade B",
              "NABARD",
            ].map((exam) => (
              <span
                key={exam}
                className="bg-white px-3 py-1 rounded-full border"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Explore Pass Elite
        </button>
      </div>

      {/* WHY PASS SECTION */}
      <div className="bg-yellow-50 rounded-2xl p-10 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why is Pass Pro a must-have?
        </h2>

        <div className="bg-white rounded-2xl p-8 space-y-8 shadow-sm">
          {[
            {
              title: "150,000+ Mock Tests",
              desc: "Attempt all mock tests across multiple exams.",
            },
            {
              title: "30,000+ Previous Year Papers",
              desc: "Get detailed AIR ranking & analysis.",
            },
            {
              title: "Access to Practice Pro Questions",
              desc: "Improve weak areas with curated questions.",
            },
            {
              title: "Access to Pro Live Tests",
              desc: "Unlock daily live tests with ranking.",
            },
            {
              title: "Unlimited Re-Attempts",
              desc: "Retake tests & improve from mistakes.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center font-bold text-yellow-600">
                ✔
              </div>

              <div>
                <h4 className="font-semibold text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT BUTTON */}
      <div className="flex justify-end">
        <button
          className={`${theme.btn} text-white px-10 py-3 rounded-xl font-semibold transition`}
        >
          Proceed To Payment
        </button>
      </div>

    </div>
  );
}

export default Pass;