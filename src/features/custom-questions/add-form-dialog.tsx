import { DialogClose, DialogContent, DialogFooter } from "@/src/components/ui/dialog";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  category: string;
  freshness: string;
  template?: string;
}

interface AddFormDialogProps {
  onFormAdded: () => void;
}

export default function AddFormDialog({ onFormAdded }: AddFormDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [formType, setFormType] = useState<"scratch" | "template">("scratch");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        category: "",
        freshness: "",
        template: ""
    });

    // Placeholder options - replace with your actual data
    const categories = ["General", "Feedback", "Survey"];
    const freshnessOptions = ["Daily", "Weekly", "Monthly", "As Needed"];
    const templates = ["Onboarding Template", "Feedback Template A", "Survey Template X"];

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            setError(null);
            
            const response = await fetch('/api/custom-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create form');
            }

            const data = await response.json();
            
            onFormAdded(); // Notify parent to refresh data
            
            // Close the dialog
            setIsOpen(false);
            
            // Reset form data
            setFormData({
                name: "",
                category: "",
                freshness: "",
                template: ""
            });
            
            // Navigate to the new form page
            router.push(`/admin/configure/custom-questions/${data.id}`);
        } catch (error) {
            console.error('Error creating form:', error);
            setError(error instanceof Error ? error.message : 'An error occurred while creating the form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setError(null); // Clear errors when dialog is closed
            }
        }}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Add Form</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Form</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <RadioGroup defaultValue="scratch" onValueChange={(value: "scratch" | "template") => setFormType(value)} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scratch" id="r1" />
                <Label htmlFor="r1">Start from Scratch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="template" id="r2" />
                <Label htmlFor="r2">Use Template</Label>
              </div>
            </RadioGroup>

            {formType === "scratch" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="e.g., Quarterly Feedback" 
                    className="col-span-3"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="freshness-scratch" className="text-right">
                    Freshness
                  </Label>
                  <Select 
                    value={formData.freshness}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, freshness: value }))}
                  >
                    <SelectTrigger id="freshness-scratch" className="col-span-3">
                      <SelectValue placeholder="Select freshness" />
                    </SelectTrigger>
                    <SelectContent>
                      {freshnessOptions.map(opt => <SelectItem key={opt} value={opt.toLowerCase().replace(" ", "-")}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {formType === "template" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template" className="text-right">
                    Template
                  </Label>
                  <Select 
                    value={formData.template}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
                  >
                    <SelectTrigger id="template" className="col-span-3">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(tmpl => <SelectItem key={tmpl} value={tmpl.toLowerCase().replace(/\s+/g, "-")}>{tmpl}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="freshness-template" className="text-right">
                    Freshness
                  </Label>
                  <Select 
                    value={formData.freshness}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, freshness: value }))}
                  >
                    <SelectTrigger id="freshness-template" className="col-span-3">
                      <SelectValue placeholder="Select freshness" />
                    </SelectTrigger>
                    <SelectContent>
                      {freshnessOptions.map(opt => <SelectItem key={opt} value={opt.toLowerCase().replace(" ", "-")}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.category || !formData.freshness || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
          {error && (
            <div className="mt-4 text-sm text-red-500">
              {error}
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
}