
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicPricingQuery } from "../redux/apis/pricingApi";
import { useCreateBookingMutation } from "../redux/apis/bookingApi";
import { toast } from "react-toastify";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: plans = [] } = useGetPublicPricingQuery();
  const plan = plans.find((p) => p._id === id);

  const [createBooking] = useCreateBookingMutation();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    bookingDate: "",
    bookingTime: "",
  });

  if (!plan) return <div className="p-20">Loading...</div>;

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.bookingDate ||
      !form.bookingTime
    ) {
      toast.error("All fields required");
      return;
    }

    try {
      await createBooking({
        planId: plan._id,
        name: form.name,
        mobile: form.mobile,
        address: form.address,
        bookingDate: form.bookingDate,
        bookingTime: form.bookingTime,
      }).unwrap();

      toast.success("Booking Confirmed!");
      navigate("/booking-success");
    } catch {
      toast.error("Booking failed");
    }
  };

  return (
    <section className="py-24 flex justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <button
          onClick={() => navigate("/pricing")}
          className="text-sm text-gray-500 mb-4"
        >
          ← Back to Pricing
        </button>

        <h2 className="text-2xl font-bold mb-1">
          Book: {plan.title}
        </h2>
        <p className="mb-4 text-gray-600">
          {plan.currency}{plan.price} {plan.unit}
        </p>

        <input
          type="text"
          placeholder="Your Name"
          className="input mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          className="input mb-3"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          className="input mb-3"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* DATE */}
        <input
          type="date"
          className="input mb-3"
          value={form.bookingDate}
          onChange={(e) =>
            setForm({ ...form, bookingDate: e.target.value })
          }
        />

        {/* TIME */}
        <input
          type="time"
          className="input mb-5"
          value={form.bookingTime}
          onChange={(e) =>
            setForm({ ...form, bookingTime: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3 rounded-md font-semibold"
        >
          Confirm Booking
        </button>
      </div>
    </section>
  );
}
