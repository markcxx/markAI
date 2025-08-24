/**
 * 格式化模型名称显示
 * 对于MarkAI提供的模型，去除冒号及其后面的所有字符
 * 例如："model:fireworks-ai" -> "model"
 *
 * @param modelId - 模型ID
 * @param provider - 提供商名称
 * @returns 格式化后的模型名称
 */
export const formatModelName = (modelId: string, provider?: string): string => {
  // 如果是MarkAI提供商，去除冒号及其后面的字符
  if (provider === 'markai' && modelId.includes(':')) {
    return modelId.split(':')[0];
  }

  return modelId;
};

/**
 * 格式化模型显示名称
 * 优先使用displayName，如果没有则使用格式化后的modelId
 *
 * @param modelId - 模型ID
 * @param displayName - 显示名称
 * @param provider - 提供商名称
 * @returns 格式化后的显示名称
 */
export const formatModelDisplayName = (
  modelId: string,
  displayName?: string,
  provider?: string,
): string => {
  if (displayName) {
    return displayName;
  }

  return formatModelName(modelId, provider);
};
