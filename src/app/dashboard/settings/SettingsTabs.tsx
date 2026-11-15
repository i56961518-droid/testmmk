"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { updateGeneral, updateProfile, updateSecurity, updateNotifications, requestDeleteAccount } from "../actions";

export function SettingsTabs({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 5000);
  };

  async function handleGeneral(formData: FormData) {
    const res = await updateGeneral(formData);
    showStatus(res.success ? "General settings saved!" : res.error || "Error");
  }
  async function handleProfile(formData: FormData) {
    const res = await updateProfile(formData);
    showStatus(res.success ? "Profile saved!" : res.error || "Error");
  }
  async function handleSecurity(formData: FormData) {
    if (formData.get("newPassword") && formData.get("newPassword") !== formData.get("confirmPassword")) {
      return showStatus("Passwords do not match");
    }
    const res = await updateSecurity(formData);
    showStatus(res.success ? "Security settings updated!" : res.error || "Error");
  }
  async function handleNotifications(formData: FormData) {
    const res = await updateNotifications(formData);
    showStatus(res.success ? "Notification preferences saved!" : res.error || "Error");
  }

  async function handleDelete(formData: FormData) {
    if (!window.confirm("Are you absolutely sure you want to delete your account? This action is irreversible.")) {
      return;
    }
    setIsDeleting(true);
    const res = await requestDeleteAccount(formData);
    
    if (res.success) {
      if (res.deleted) {
        // If no 2FA, delete instantly and log out
        await signOut({ callbackUrl: "/" });
      } else {
        // If 2FA, show message that email was sent
        showStatus(res.message || "Confirmation email sent.");
        setIsDeleting(false);
      }
    } else {
      showStatus(res.error || "Error deleting account");
      setIsDeleting(false);
    }
  }

  const timezones = typeof Intl.supportedValuesOf === 'function' 
    ? (Intl as any).supportedValuesOf('timeZone') 
    : ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

  const tabs = [
    { id: "general", label: "General" },
    { id: "profile", label: "Business Profile" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "delete", label: "Delete Account", icon: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-72 shrink-0">
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 border-b lg:border-b-0 border-ink/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStatus(""); }}
              className={`flex items-center gap-3 text-left px-5 py-3 font-bold text-sm uppercase tracking-widest transition-colors rounded-md whitespace-nowrap ${
                activeTab === tab.id 
                  ? tab.id === "delete" ? "bg-red-500 text-white" : "bg-ink text-paper" 
                  : tab.id === "delete" ? "text-red-500 hover:bg-red-50" : "text-ink/60 hover:bg-ink/5"
              }`}
            >
              {tab.icon && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon} /></svg>
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-paper border border-ink/10 p-8 md:p-12 shadow-sm min-h-[500px]">
        {status && <div className="bg-magenta/10 border-2 border-magenta text-magenta font-bold p-4 mb-8">{status}</div>}

        {activeTab === "general" && (
          <form action={handleGeneral} className="space-y-8 max-w-xl animate-in fade-in">
            <h2 className="text-2xl font-bold mb-6">General Information</h2>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Full Name</label>
              <input name="name" defaultValue={user.name || ""} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Email Address</label>
              <input name="email" type="email" defaultValue={user.email || ""} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
            </div>
            <div className="border-t border-ink/10 pt-8">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Timezone</label>
              <select name="timezone" defaultValue={user.timezone || "UTC"} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors bg-transparent">
                {timezones.map((tz: string) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <button className="bg-ink text-paper px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-magenta transition-colors">Save General Settings</button>
          </form>
        )}

        {activeTab === "profile" && (
          <form action={handleProfile} className="space-y-8 max-w-xl animate-in fade-in">
            <h2 className="text-2xl font-bold mb-6">Business Profile</h2>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Business Name</label>
              <input name="businessName" defaultValue={user.businessName || ""} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Phone Number</label>
              <input name="phone" defaultValue={user.phone || ""} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Website</label>
              <input name="website" type="url" defaultValue={user.website || ""} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Business Address</label>
              <textarea name="address" defaultValue={user.address || ""} rows={3} className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors resize-none" />
            </div>
            <button className="bg-ink text-paper px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-magenta transition-colors">Save Profile</button>
          </form>
        )}

        {activeTab === "security" && (
          <form action={handleSecurity} className="space-y-8 max-w-xl animate-in fade-in">
            <h2 className="text-2xl font-bold mb-6">Security</h2>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Current Password</label>
              <input name="currentPassword" type="password" placeholder="Leave blank to keep current" className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">New Password</label>
              <input name="newPassword" type="password" className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors mb-4" />
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-2">Confirm New Password</label>
              <input name="confirmPassword" type="password" className="w-full border border-ink/20 p-4 outline-none focus:border-magenta transition-colors" />
            </div>
            <div className="border-t border-ink/10 pt-8">
              <h3 className="text-lg font-bold mb-4">Two-Factor Authentication (2FA)</h3>
              <div className="flex items-center gap-4">
                <input type="checkbox" name="twoFactorEnabled" defaultChecked={user.twoFactorEnabled} id="2fa" className="w-6 h-6 accent-magenta cursor-pointer" />
                <label htmlFor="2fa" className="text-sm font-medium cursor-pointer">Enable 2FA via Email</label>
              </div>
            </div>
            <button className="bg-ink text-paper px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-magenta transition-colors">Update Security Settings</button>
          </form>
        )}

        {activeTab === "notifications" && (
          <form action={handleNotifications} className="space-y-8 max-w-xl animate-in fade-in">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <input type="checkbox" name="emailNotifications" defaultChecked={user.emailNotifications} id="emailNotif" className="w-5 h-5 accent-magenta mt-1 cursor-pointer" />
                <div>
                  <label htmlFor="emailNotif" className="font-bold text-sm block cursor-pointer">Daily Project Digest</label>
                  <p className="text-xs text-ink/60">Get an automated daily email summarizing your project updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <input type="checkbox" name="marketingEmails" defaultChecked={user.marketingEmails} id="marketing" className="w-5 h-5 accent-magenta mt-1 cursor-pointer" />
                <div>
                  <label htmlFor="marketing" className="font-bold text-sm block cursor-pointer">Marketing & Tips</label>
                  <p className="text-xs text-ink/60">Receive monthly design tips, case studies, and agency news.</p>
                </div>
              </div>
            </div>
            <button className="bg-ink text-paper px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-magenta transition-colors">Save Preferences</button>
          </form>
        )}

        {activeTab === "delete" && (
          <div className="animate-in fade-in max-w-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6"/></svg>
              Delete Account
            </h2>
            <p className="text-sm text-ink/60 mb-6">Once you delete your account, there is no going back. All projects, files, and data will be permanently removed.</p>
            
            <div className="border-2 border-red-200 bg-red-50 p-6 rounded mb-6">
              <form action={handleDelete} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-red-800 block mb-2">Enter your password to confirm</label>
                  <input type="password" name="password" required className="w-full border border-red-300 p-3 outline-none focus:border-red-600 bg-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-red-800 block mb-2">Type DELETE to confirm</label>
                  <input type="text" name="confirmText" placeholder="DELETE" required className="w-full border border-red-300 p-3 outline-none focus:border-red-600 bg-white" />
                </div>
                {user.twoFactorEnabled && (
                  <p className="text-xs text-red-700 font-bold mt-2">Since 2FA is enabled, a secure confirmation email will be sent to you before deletion is finalized.</p>
                )}
                <button disabled={isDeleting} className="bg-red-600 text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50">
                  {isDeleting ? "Processing..." : "Permanently Delete Account"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}