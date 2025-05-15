import { Workspace } from "@/models/user/workspace";

export const checkResourceLimit = (resource) => {
  return async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId || req.body.workspaceId;
      if (!workspaceId) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }

      const canAdd = workspace.canAddResource(resource);
      if (!canAdd) {
        return res.status(403).json({
          error: `Workspace has reached its ${resource} limit`,
          limit: workspace.limits[resource],
          currentUsage: workspace.usage[resource],
          upgradeUrl: `/workspaces/${workspaceId}/billing/upgrade`,
        });
      }

      next();
    } catch (error) {
      console.error("Usage limit check failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const checkFeatureAccess = (feature) => {
  return async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId || req.body.workspaceId;
      if (!workspaceId) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }

      const hasAccess = PricingUtils.hasFeature(
        workspace.subscription.plan,
        feature
      );
      if (!hasAccess) {
        return res.status(403).json({
          error: `Feature ${feature} is not available in your current plan`,
          upgradeUrl: `/workspaces/${workspaceId}/billing/upgrade`,
        });
      }

      next();
    } catch (error) {
      console.error("Feature access check failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
