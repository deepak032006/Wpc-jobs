'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
// import { createPostComplianceAction } from '@/app/action/compliance.action'; // ← apna action yahan import karo

interface PostComplianceFormData {
    title: string;
    description: string;
    complianceType: string;
    priority: string;
    dueDate: string;
    notes: string;
}

export default function PostCompliancePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<PostComplianceFormData>({
        title: '',
        description: '',
        complianceType: '',
        priority: 'medium',
        dueDate: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.title || !formData.complianceType || !formData.dueDate) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            setLoading(true);

            // ✅ Yahan apna actual API action call karo:
            // const res = await createPostComplianceAction(formData);
            // if (!res.success) {
            //     toast.error(res.message || 'Failed to submit');
            //     return;
            // }

            // Simulate API delay (remove when real API hai)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // ✅ Submit hone ke baad dashboard pe jaao with ?refresh=compliance
            // Yeh param dashboard pe count +1 kar dega instantly
            router.push('/employer/dashboard?refresh=compliance');

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FDFEFF] min-h-screen p-4 md:p-6 font-inter">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                >
                    <ArrowLeft size={16} className="text-[#4B5563]" />
                </button>
                <div>
                    <h1 className="text-[18px] font-bold text-[#1D1D1D]">Post Compliance</h1>
                    <p className="text-[12px] text-[#6B7280]">Fill in the details to create a new compliance task</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
                <div className="flex flex-col gap-5">

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#374151]">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter compliance title"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition"
                        />
                    </div>

                    {/* Compliance Type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#374151]">
                            Compliance Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="complianceType"
                            value={formData.complianceType}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition bg-white"
                        >
                            <option value="">Select type</option>
                            <option value="labor_law">Labor Law</option>
                            <option value="tax_compliance">Tax Compliance</option>
                            <option value="health_safety">Health & Safety</option>
                            <option value="data_privacy">Data Privacy</option>
                            <option value="employment_contract">Employment Contract</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Priority + Due Date */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-[13px] font-medium text-[#374151]">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition bg-white"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-[13px] font-medium text-[#374151]">
                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#374151]">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the compliance requirement..."
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition resize-none"
                        />
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#374151]">Additional Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any additional notes..."
                            rows={2}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1D1D1D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] transition resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            onClick={() => router.back()}
                            disabled={loading}
                            className="px-5 py-2.5 text-[13px] font-medium text-[#4B5563] border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#1A56DB] rounded-lg hover:bg-[#1648C4] transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Compliance'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}