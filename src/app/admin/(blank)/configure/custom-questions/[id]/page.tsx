"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Form {
  id: string;
  name: string;
  category: string;
  freshness: string;
  createdAt?: string; // Optional as it's added by the backend
}

export default function CustomQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Placeholder options - replace with your actual data
  const categories = ["General", "Feedback", "Survey"];
  const freshnessOptions = ["Daily", "Weekly", "Monthly", "As Needed"];

  const fetchForm = useCallback(async () => {
    if (!params.id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/custom-questions/${params.id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch form');
      }
      const data = await response.json();
      setForm(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const handleInputChange = (field: keyof Form, value: string) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveSettings = async () => {
    if (!form) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/custom-questions/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: form.name, 
          category: form.category, 
          freshness: form.freshness 
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save settings');
      }
      // Optionally show a success message or re-fetch
      alert("Settings saved!"); // Simple feedback
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form) return;
    if (window.confirm('Are you sure you want to delete this form?')) {
      setError(null);
      try {
        const response = await fetch(`/api/custom-questions/${form.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete form');
        }
        router.push('/admin/configure/custom-questions');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while deleting');
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error && !form) { // Show main error if form couldn't be fetched
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="text-red-500">Error: {error}</div>
          <Button onClick={fetchForm} className="mt-4">Try Again</Button>
        </div>
      );
    }
    
    if (!form) { // Should ideally be caught by error state if fetch fails
        return (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-gray-600">Form not found.</div>
          </div>
        );
      }

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{form.name}</h1>
        <div className="mt-8 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-lg min-h-[200px]">
          <p className="text-gray-500 text-lg">There's nothing here. Add a question to get started.</p>
        </div>
      </div>
    );
  };

  return (
    <ThreeColumnLayout
      leftColumn={
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-4">Question Details</h2>
          <div className="flex-1">
            {/* Question details content will go here */}
          </div>
          <div className="mt-auto space-y-2">
            <Button
              className="w-full"
              onClick={() => {/* Handle add question */}}
            >
              Add Question
            </Button>
          </div>
        </div>
      }
      rightColumn={
        <div className="p-4 flex flex-col h-full bg-gray-50 border-l border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Form Settings</h2>
          {form ? (
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={form.name || ''} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter form name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={form.category || ''} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="freshness">Freshness</Label>
                <Select 
                  value={form.freshness || ''} 
                  onValueChange={(value) => handleInputChange('freshness', value)}
                >
                  <SelectTrigger id="freshness">
                    <SelectValue placeholder="Select freshness" />
                  </SelectTrigger>
                  <SelectContent>
                    {freshnessOptions.map(opt => (
                      <SelectItem key={opt} value={opt.toLowerCase().replace(" ", "-")}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSettings} disabled={isSaving} className="w-full">
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>} 
            </div>
          ) : (
            <div className="text-sm text-gray-500">Loading form settings...</div>
          )}
          <div className="mt-auto pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleDelete}
              disabled={!form || isSaving}
            >
              Delete Form
            </Button>
          </div>
        </div>
      }
    >
      {renderContent()}
    </ThreeColumnLayout>
  );
}
