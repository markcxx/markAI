/**
 * 格式化模型名称显示
 * 对于包含冒号的模型ID，去除冒号及其后面的所有字符
 *
 * @param modelId - 模型ID
 * @returns 格式化后的模型名称
 */
export const formatModelName = (modelId: string): string => {
  // 对于所有包含冒号的模型ID，去除冒号及其后面的字符
  // 这主要用于处理MARKAI_MODEL_LIST中的模型格式
  if (modelId.includes(':')) {
    return modelId.split(':')[0];
  }

  return modelId;
};

/**
 * 格式化模型显示名称
 * 优先使用displayName，如果没有则使用格式化后的modelId
 * 如果displayName包含冒号，也会进行格式化处理
 *
 * @param modelId - 模型ID
 * @param displayName - 显示名称
 * @param _provider - 提供商名称（保留以兼容现有调用）
 * @returns 格式化后的显示名称
 */
export const formatModelDisplayName = (
  modelId: string,
  displayName?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _provider?: string,
): string => {
  if (displayName) {
    // 如果displayName包含冒号，也需要格式化
    return formatModelName(displayName);
  }

  return formatModelName(modelId);
};
