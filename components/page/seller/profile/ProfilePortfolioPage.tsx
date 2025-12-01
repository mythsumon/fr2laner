"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Upload, Save, Image as ImageIcon, X, Globe, Linkedin, Github, Twitter, Mail, Phone } from "lucide-react";
import { Button } from "@/components/shared/common";
import { useAuth } from "@/hooks/useAuth";

export const ProfilePortfolioPage = () => {
  const { user } = useAuth();
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [portfolioTagInputs, setPortfolioTagInputs] = useState<Record<string, string>>({});
  const [showPortfolioTagSuggestions, setShowPortfolioTagSuggestions] = useState<Record<string, boolean>>({});
  
  const [formData, setFormData] = useState({
    displayName: user?.name || "",
    description: "",
    languages: [] as string[],
    skills: [] as string[],
    education: "",
    experience: "",
    profilePhoto: null as File | null,
    profilePhotoUrl: "",
    portfolio: [] as Array<{ id: string; file: File; url: string; title: string; description: string; category: string; tags: string[] }>,
    contactEmail: "",
    contactPhone: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
  });

  // Load admin tags from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_service_tags");
      if (stored) {
        try {
          const tags: string[] = JSON.parse(stored);
          setAvailableTags(tags);
        } catch (e) {
          console.warn("Failed to parse admin tags", e);
        }
      }

      // Listen for storage changes
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "admin_service_tags" && e.newValue) {
          try {
            const tags: string[] = JSON.parse(e.newValue);
            setAvailableTags(tags);
          } catch (e) {
            console.warn("Failed to parse admin tags", e);
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  // Load saved profile data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("seller_profile");
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setFormData((prev) => ({
            ...prev,
            ...parsed,
            profilePhoto: null, // Don't restore File objects
            portfolio: parsed.portfolio || [],
          }));
        } catch (e) {
          console.warn("Failed to parse seller_profile from localStorage", e);
        }
      }
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".skill-suggestions") && !target.closest(".skill-input")) {
        setShowSkillSuggestions(false);
      }
      if (!target.closest(".portfolio-tag-suggestions") && !target.closest(".portfolio-tag-input")) {
        setShowPortfolioTagSuggestions({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter tags for skills
  const filteredSkillTags = useMemo(() => {
    if (!skillInput.trim()) return availableTags.filter(tag => !formData.skills.includes(tag));
    return availableTags
      .filter(tag => 
        tag.toLowerCase().includes(skillInput.toLowerCase()) && 
        !formData.skills.includes(tag)
      )
      .slice(0, 10);
  }, [skillInput, availableTags, formData.skills]);

  // Filter tags for portfolio items
  const getFilteredPortfolioTags = (portfolioId: string, currentTags: string[]) => {
    const input = portfolioTagInputs[portfolioId] || "";
    if (!input.trim()) return availableTags.filter(tag => !currentTags.includes(tag));
    return availableTags
      .filter(tag => 
        tag.toLowerCase().includes(input.toLowerCase()) && 
        !currentTags.includes(tag)
      )
      .slice(0, 10);
  };

  const handleSave = () => {
    // Convert portfolio files to base64 for storage
    const portfolioPromises = formData.portfolio.map((item) => {
      return new Promise<{ id: string; url: string; title: string; description: string; category: string; tags: string[] }>((resolve) => {
        if (item.file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              id: item.id,
              url: reader.result as string,
              title: item.title,
              description: item.description,
              category: item.category,
              tags: item.tags,
            });
          };
          reader.readAsDataURL(item.file);
        } else {
          resolve({
            id: item.id,
            url: item.url,
            title: item.title,
            description: item.description,
            category: item.category,
            tags: item.tags,
          });
        }
      });
    });

    Promise.all(portfolioPromises).then((portfolioData) => {
      // Convert profile photo to base64
      let profilePhotoUrl = formData.profilePhotoUrl;
      if (formData.profilePhoto) {
        const reader = new FileReader();
        reader.onloadend = () => {
          profilePhotoUrl = reader.result as string;
          const dataToSave = {
            displayName: formData.displayName,
            description: formData.description,
            languages: formData.languages,
            skills: formData.skills,
            education: formData.education,
            experience: formData.experience,
            profilePhotoUrl,
            portfolio: portfolioData,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
            website: formData.website,
            linkedin: formData.linkedin,
            github: formData.github,
            twitter: formData.twitter,
          };
          localStorage.setItem("seller_profile", JSON.stringify(dataToSave));
          
          // Also save to seller_portfolios for public display
          const sellerId = user?.id || "seller-1";
          const portfolios = portfolioData.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            thumb: p.url,
            sellerName: formData.displayName,
            sellerAvatar: profilePhotoUrl,
            views: 0,
            likes: 0,
            category: p.category,
            tags: p.tags,
            createdAt: new Date().toISOString(),
          }));
          localStorage.setItem(`seller_portfolios_${sellerId}`, JSON.stringify(portfolios));
          
          alert("Profile and portfolio saved successfully!");
        };
        reader.readAsDataURL(formData.profilePhoto);
      } else {
        const dataToSave = {
          displayName: formData.displayName,
          description: formData.description,
          languages: formData.languages,
          skills: formData.skills,
          education: formData.education,
          experience: formData.experience,
          profilePhotoUrl,
          portfolio: portfolioData,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          website: formData.website,
          linkedin: formData.linkedin,
          github: formData.github,
          twitter: formData.twitter,
        };
        localStorage.setItem("seller_profile", JSON.stringify(dataToSave));
        
        // Also save to seller_portfolios for public display
        const sellerId = user?.id || "seller-1";
        const portfolios = portfolioData.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          thumb: p.url,
          sellerName: formData.displayName,
          sellerAvatar: profilePhotoUrl,
          views: 0,
          likes: 0,
          category: p.category,
          tags: p.tags,
          createdAt: new Date().toISOString(),
        }));
        localStorage.setItem(`seller_portfolios_${sellerId}`, JSON.stringify(portfolios));
        
        alert("Profile and portfolio saved successfully!");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] p-4 pb-24 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">Profile & Portfolio</h1>
          <p className="mt-1 text-sm text-[#475569]">Manage your profile information and portfolio</p>
        </div>

        {/* Profile Photo */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="relative size-24 overflow-hidden rounded-full bg-slate-100">
              {formData.profilePhoto ? (
                <Image
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : formData.profilePhotoUrl ? (
                <Image
                  src={formData.profilePhotoUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl text-[#CBD5F5]">
                  👤
                </div>
              )}
            </div>
            <label className="cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9]">
              <Upload className="mr-2 inline size-4" />
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, profilePhoto: file }));
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="Tell us about yourself and your expertise..."
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Professional Information</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Education</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                placeholder="e.g., Bachelor's in Design"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="e.g., 10 years"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Languages</label>
              <div className="mb-3 flex flex-wrap gap-2">
                {formData.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 rounded-full bg-[#E9EEF8] px-3 py-1 text-sm font-medium text-[#2E5E99]"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          languages: prev.languages.filter((l) => l !== lang),
                        }))
                      }
                      className="hover:text-[#1d4673]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add language (press Enter)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.currentTarget;
                    if (input.value.trim() && !formData.languages.includes(input.value.trim())) {
                      setFormData((prev) => ({
                        ...prev,
                        languages: [...prev.languages, input.value.trim()],
                      }));
                      input.value = "";
                    }
                  }
                }}
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="contact@example.com"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="010-1234-5678"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Social Links</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Globe className="size-4" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Linkedin className="size-4" />
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Github className="size-4" />
                GitHub
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                placeholder="https://github.com/yourusername"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Twitter className="size-4" />
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                placeholder="https://twitter.com/yourusername"
                className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Skills</h2>
          <div className="mb-3 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-[#E9EEF8] px-3 py-1 text-sm font-medium text-[#2E5E99]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((s) => s !== skill),
                    }))
                  }
                  className="hover:text-[#1d4673]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Add skill (type to see suggestions or press Enter)"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setShowSkillSuggestions(true);
              }}
              onFocus={() => setShowSkillSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = e.currentTarget;
                  if (input.value.trim() && !formData.skills.includes(input.value.trim())) {
                    setFormData((prev) => ({
                      ...prev,
                      skills: [...prev.skills, input.value.trim()],
                    }));
                    setSkillInput("");
                    setShowSkillSuggestions(false);
                  }
                }
              }}
              className="skill-input w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
            />
            {showSkillSuggestions && filteredSkillTags.length > 0 && (
              <div className="skill-suggestions absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg">
                {filteredSkillTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!formData.skills.includes(tag)) {
                        setFormData((prev) => ({
                          ...prev,
                          skills: [...prev.skills, tag],
                        }));
                        setSkillInput("");
                        setShowSkillSuggestions(false);
                      }
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          {availableTags.length > 0 && (
            <p className="mt-2 text-xs text-[#64748B]">
              Available tags from admin: {availableTags.length} tags
            </p>
          )}
        </div>

        {/* Portfolio */}
        <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">Portfolio</h2>
          <div className="space-y-4">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-colors hover:border-[#2E5E99] hover:bg-[#E9EEF8]">
              <ImageIcon className="size-5 text-[#2E5E99]" />
              <span className="text-sm font-semibold text-[#2E5E99]">Upload Portfolio Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const id = `portfolio-${Date.now()}`;
                    setFormData((prev) => ({
                      ...prev,
                      portfolio: [
                        ...prev.portfolio,
                        {
                          id,
                          file,
                          url: URL.createObjectURL(file),
                          title: "",
                          description: "",
                          category: "",
                          tags: [],
                        },
                      ],
                    }));
                  }
                }}
              />
            </label>
            {formData.portfolio.length > 0 && (
              <div className="space-y-4">
                {formData.portfolio.map((item, index) => (
                  <div key={item.id} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="mb-4 flex gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={item.url}
                          alt={`Portfolio ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Portfolio Title"
                          value={item.title}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              portfolio: prev.portfolio.map((p) =>
                                p.id === item.id ? { ...p, title: e.target.value } : p
                              ),
                            }));
                          }}
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                        />
                        <textarea
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              portfolio: prev.portfolio.map((p) =>
                                p.id === item.id ? { ...p, description: e.target.value } : p
                              ),
                            }));
                          }}
                          rows={2}
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Category (e.g., Logo Design)"
                          value={item.category}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              portfolio: prev.portfolio.map((p) =>
                                p.id === item.id ? { ...p, category: e.target.value } : p
                              ),
                            }));
                          }}
                          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2E5E99] focus:outline-none"
                        />
                        <div className="relative">
                          <div className="mb-2 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-[#E9EEF8] px-2 py-1 text-xs font-medium text-[#2E5E99]"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      portfolio: prev.portfolio.map((p) =>
                                        p.id === item.id ? { ...p, tags: p.tags.filter((t) => t !== tag) } : p
                                      ),
                                    }));
                                  }}
                                  className="hover:text-[#1d4673]"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Add tag (type to see suggestions or press Enter)"
                              value={portfolioTagInputs[item.id] || ""}
                              onChange={(e) => {
                                setPortfolioTagInputs((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }));
                                setShowPortfolioTagSuggestions((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }));
                              }}
                              onFocus={() => {
                                setShowPortfolioTagSuggestions((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const input = e.currentTarget;
                                  if (input.value.trim() && !item.tags.includes(input.value.trim())) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      portfolio: prev.portfolio.map((p) =>
                                        p.id === item.id
                                          ? { ...p, tags: [...p.tags, input.value.trim()] }
                                          : p
                                      ),
                                    }));
                                    setPortfolioTagInputs((prev) => ({
                                      ...prev,
                                      [item.id]: "",
                                    }));
                                    setShowPortfolioTagSuggestions((prev) => ({
                                      ...prev,
                                      [item.id]: false,
                                    }));
                                  }
                                }
                              }}
                              className="portfolio-tag-input w-full rounded-lg border border-[#E2E8F0] px-3 py-1 text-xs focus:border-[#2E5E99] focus:outline-none"
                            />
                            {showPortfolioTagSuggestions[item.id] && getFilteredPortfolioTags(item.id, item.tags).length > 0 && (
                              <div className="portfolio-tag-suggestions absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg">
                                {getFilteredPortfolioTags(item.id, item.tags).map((tag) => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                      if (!item.tags.includes(tag)) {
                                        setFormData((prev) => ({
                                          ...prev,
                                          portfolio: prev.portfolio.map((p) =>
                                            p.id === item.id
                                              ? { ...p, tags: [...p.tags, tag] }
                                              : p
                                          ),
                                        }));
                                        setPortfolioTagInputs((prev) => ({
                                          ...prev,
                                          [item.id]: "",
                                        }));
                                        setShowPortfolioTagSuggestions((prev) => ({
                                          ...prev,
                                          [item.id]: false,
                                        }));
                                      }
                                    }}
                                    className="w-full px-3 py-2 text-left text-xs text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            portfolio: prev.portfolio.filter((p) => p.id !== item.id),
                          }))
                        }
                        className="h-fit rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={handleSave}
            className="gap-2 bg-[#2E5E99] px-6 text-sm font-semibold text-white hover:bg-[#1d4673]"
          >
            <Save className="size-4" />
            Save Profile & Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

