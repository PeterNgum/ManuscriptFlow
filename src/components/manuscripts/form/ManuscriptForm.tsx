import React, { useState, useEffect } from 'react';
import { TitleAbstractForm } from './TitleAbstractForm';
import { KeywordsForm } from './KeywordsForm';
import { ManuscriptCategoriesForm } from './ManuscriptCategoriesForm';
import { categoriesService } from '../../../services/categories.service';
import type { ResearchPillar, DataDomain, AiMlCategory, DiseaseArea } from '../../../types/categoryTypes';
import type { Database } from '../../../types/database';

type NewManuscript = Database['public']['Tables']['manuscripts']['Insert'];

interface ManuscriptFormProps {
  initialData?: Partial<NewManuscript>;
  onSubmit: (data: NewManuscript) => Promise<void>;
}

export function ManuscriptForm({ initialData, onSubmit }: ManuscriptFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [abstract, setAbstract] = useState(initialData?.abstract ?? '');
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords ?? []);
  const [diseaseAreaId, setDiseaseAreaId] = useState(initialData?.disease_area_id ?? '');
  const [primaryResearchPillar, setPrimaryResearchPillar] = useState<ResearchPillar | null>(
    initialData?.primary_research_pillar ?? null
  );
  const [primaryDataDomain, setPrimaryDataDomain] = useState<DataDomain | null>(
    initialData?.primary_data_domain ?? null
  );
  const [primaryAiMlCategory, setPrimaryAiMlCategory] = useState<AiMlCategory | null>(
    initialData?.primary_ai_ml_category ?? null
  );
  const [diseaseAreas, setDiseaseAreas] = useState<DiseaseArea[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiseaseAreas = async () => {
      try {
        const areas = await categoriesService.getDiseaseAreas();
        setDiseaseAreas(areas);
      } catch (err) {
        setError('Failed to load disease areas');
        console.error(err);
      }
    };
    loadDiseaseAreas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        title,
        abstract,
        keywords,
        status: 'draft',
        disease_area_id: diseaseAreaId,
        primary_research_pillar: primaryResearchPillar,
        primary_data_domain: primaryDataDomain,
        primary_ai_ml_category: primaryAiMlCategory,
        current_version: 1
      });
    } catch (err) {
      setError('Failed to submit manuscript');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <TitleAbstractForm
        title={title}
        abstract={abstract}
        onTitleChange={setTitle}
        onAbstractChange={setAbstract}
      />

      <KeywordsForm
        keywords={keywords}
        onKeywordsChange={setKeywords}
      />

      <ManuscriptCategoriesForm
        diseaseAreaId={diseaseAreaId}
        diseaseAreas={diseaseAreas}
        primaryResearchPillar={primaryResearchPillar}
        primaryDataDomain={primaryDataDomain}
        primaryAiMlCategory={primaryAiMlCategory}
        onDiseaseAreaChange={setDiseaseAreaId}
        onResearchPillarChange={setPrimaryResearchPillar}
        onDataDomainChange={setPrimaryDataDomain}
        onAiMlCategoryChange={setPrimaryAiMlCategory}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Manuscript'}
        </button>
      </div>
    </form>
  );
}