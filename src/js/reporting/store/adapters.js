import { flatten, flattenDepth } from 'lodash';

export const getModelBaseData = modelList =>
  flattenDepth(modelList
    .map(model => ({
      id: parseInt(model.id, 10),
      name: model.name,
    })));

export const getModelIds = modelList =>
  flattenDepth(modelList
    .map(model => parseInt(model.id, 10)));

export const getSelectedModels = (modelList, selectedModelIds) =>
  flatten(selectedModelIds
    .map(modelId =>
      modelList
        .filter(model => parseInt(model.id, 10) === parseInt(modelId, 10))));

export const getSelectedModelNames = (modelList, selectedModelIds) =>
  getSelectedModels(modelList, selectedModelIds)
    .map(selectedModel => selectedModel.attributes.name);
