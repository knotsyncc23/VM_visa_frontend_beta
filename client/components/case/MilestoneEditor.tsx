import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseMilestone } from '../../../shared/api';
import {
  Plus,
  Trash2,
  GripVertical,
  Calendar,
  DollarSign,
  FileText,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface MilestoneEditorProps {
  milestones: CaseMilestone[];
  totalAmount: number;
  onSave: (milestones: CaseMilestone[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function MilestoneEditor({ 
  milestones, 
  totalAmount, 
  onSave, 
  onCancel, 
  isLoading = false 
}: MilestoneEditorProps) {
  const [editedMilestones, setEditedMilestones] = useState<CaseMilestone[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize with existing milestones or create default ones
    if (milestones.length > 0) {
      setEditedMilestones([...milestones]);
    } else {
      createDefaultMilestones();
    }
  }, [milestones, totalAmount]);

  const createDefaultMilestones = () => {
    const defaultMilestones: CaseMilestone[] = [
      {
        title: 'Initial Consultation & Document Review',
        description: 'Review application requirements, assess eligibility, and prepare initial documentation checklist.',
        amount: Math.round(totalAmount * 0.25),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        order: 1,
        status: 'pending',
        isActive: true,
        deliverables: ['Document checklist', 'Eligibility assessment', 'Initial consultation report'],
        submittedFiles: [],
        agentNotes: '',
        clientFeedback: ''
      },
      {
        title: 'Document Preparation & Submission',
        description: 'Prepare all required documents, complete application forms, and submit to relevant authorities.',
        amount: Math.round(totalAmount * 0.35),
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        order: 2,
        status: 'pending',
        isActive: false,
        deliverables: ['Completed application forms', 'Supporting documents', 'Submission confirmation'],
        submittedFiles: [],
        agentNotes: '',
        clientFeedback: ''
      },
      {
        title: 'Application Processing & Follow-up',
        description: 'Monitor application status, respond to any requests for additional information, and coordinate with authorities.',
        amount: Math.round(totalAmount * 0.25),
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        order: 3,
        status: 'pending',
        isActive: false,
        deliverables: ['Status updates', 'Response to queries', 'Processing coordination'],
        submittedFiles: [],
        agentNotes: '',
        clientFeedback: ''
      },
      {
        title: 'Final Review & Delivery',
        description: 'Final review of approved application, delivery of documents, and post-approval guidance.',
        amount: totalAmount - Math.round(totalAmount * 0.85),
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        order: 4,
        status: 'pending',
        isActive: false,
        deliverables: ['Approved documents', 'Post-approval guidance', 'Case completion report'],
        submittedFiles: [],
        agentNotes: '',
        clientFeedback: ''
      }
    ];

    setEditedMilestones(defaultMilestones);
  };

  const addMilestone = () => {
    const newMilestone: CaseMilestone = {
      title: '',
      description: '',
      amount: 0,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      order: editedMilestones.length + 1,
      status: 'pending',
      isActive: false,
      deliverables: [],
      submittedFiles: [],
      agentNotes: '',
      clientFeedback: ''
    };
    
    setEditedMilestones([...editedMilestones, newMilestone]);
  };

  const removeMilestone = (index: number) => {
    const updated = editedMilestones.filter((_, i) => i !== index);
    // Reorder remaining milestones
    const reordered = updated.map((milestone, i) => ({
      ...milestone,
      order: i + 1
    }));
    setEditedMilestones(reordered);
  };

  const updateMilestone = (index: number, field: keyof CaseMilestone, value: any) => {
    const updated = [...editedMilestones];
    updated[index] = { ...updated[index], [field]: value };
    setEditedMilestones(updated);
    
    // Clear error for this field
    const errorKey = `${index}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const validateMilestones = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check each milestone
    editedMilestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`${index}-title`] = 'Title is required';
        isValid = false;
      }
      if (!milestone.description.trim()) {
        newErrors[`${index}-description`] = 'Description is required';
        isValid = false;
      }
      if (milestone.amount <= 0) {
        newErrors[`${index}-amount`] = 'Amount must be positive';
        isValid = false;
      }
      if (!milestone.dueDate) {
        newErrors[`${index}-dueDate`] = 'Due date is required';
        isValid = false;
      }
    });

    // Check total amount
    const total = editedMilestones.reduce((sum, m) => sum + m.amount, 0);
    if (Math.abs(total - totalAmount) > 0.01) {
      newErrors.total = `Total milestone amount (${total}) must equal case amount (${totalAmount})`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (validateMilestones()) {
      await onSave(editedMilestones);
    }
  };

  const getTotalAmount = () => {
    return editedMilestones.reduce((sum, milestone) => sum + milestone.amount, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-cool-gray-800">Edit Milestones</h2>
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-cool-gray-600 mt-2">
            Define the milestones for this case. Total amount must equal ${totalAmount.toLocaleString()}.
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            <AnimatePresence>
              {editedMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-cool-gray-400" />
                          <Badge variant="outline">#{milestone.order}</Badge>
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Milestone title"
                            value={milestone.title}
                            onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                            className={errors[`${index}-title`] ? 'border-red-500' : ''}
                          />
                          {errors[`${index}-title`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`${index}-title`]}</p>
                          )}
                        </div>
                        {editedMilestones.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeMilestone(index)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <Textarea
                          placeholder="Milestone description"
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                          className={errors[`${index}-description`] ? 'border-red-500' : ''}
                          rows={3}
                        />
                        {errors[`${index}-description`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`${index}-description`]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-cool-gray-700 mb-1">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            Amount
                          </label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={milestone.amount || ''}
                            onChange={(e) => updateMilestone(index, 'amount', parseFloat(e.target.value) || 0)}
                            className={errors[`${index}-amount`] ? 'border-red-500' : ''}
                          />
                          {errors[`${index}-amount`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`${index}-amount`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-cool-gray-700 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Due Date
                          </label>
                          <Input
                            type="date"
                            value={formatDate(milestone.dueDate)}
                            onChange={(e) => updateMilestone(index, 'dueDate', new Date(e.target.value).toISOString())}
                            className={errors[`${index}-dueDate`] ? 'border-red-500' : ''}
                          />
                          {errors[`${index}-dueDate`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`${index}-dueDate`]}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cool-gray-700 mb-1">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Deliverables (comma-separated)
                        </label>
                        <Input
                          placeholder="e.g., Document review, Application forms, Status update"
                          value={milestone.deliverables?.join(', ') || ''}
                          onChange={(e) => updateMilestone(index, 'deliverables', 
                            e.target.value.split(',').map(d => d.trim()).filter(d => d)
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button
              variant="outline"
              onClick={addMilestone}
              disabled={isLoading}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>

        <div className="p-6 border-t bg-cool-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-cool-gray-600">
              Total: <span className="font-semibold">${getTotalAmount().toLocaleString()}</span>
              {' / '}
              <span className="font-semibold">${totalAmount.toLocaleString()}</span>
            </div>
            {errors.total && (
              <p className="text-red-500 text-sm">{errors.total}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Milestones
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
