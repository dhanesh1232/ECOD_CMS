import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputData from "../components/input-fields";
import SEO from "../components/seo-update";
import EditorHead from "../components/editor_header";

const PolicyPage = () => {
  const router = useRouter();
  const { template_id } = router.query;

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editedPolicy, setEditedPolicy] = useState(null);
  const [editSEO, setEditSEO] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [activePopDelete, setActivePopDelete] = useState(false);

  useEffect(() => {
    if (template_id) {
      fetch(`/api/policies/${template_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPolicy(data);
          setEditedPolicy(data); // Clone data for editing
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching policy:", error);
          setError("Failed to fetch policy. Please try again.");
          setLoading(false);
        });
    }
  }, [template_id]);

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedPolicy((prev) => {
      const updatedPolicy = { ...prev, [field]: value };

      // Only mark as editing if the new data differs from the original
      const isDifferent =
        JSON.stringify(updatedPolicy) !== JSON.stringify(policy);
      setIsEditing(isDifferent);

      return updatedPolicy;
    });
  };

  // Discard changes and revert to original data
  const handleDiscard = () => {
    setEditedPolicy(policy);
    setIsEditing(false);
  };

  // Save changes
  const handleSave = () => {
    fetch(`/api/policies/${template_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedPolicy),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save policy.");
        }
        return response.json();
      })
      .then((data) => {
        setPolicy(data);
        setIsEditing(false);
        console.log("Policy updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving policy:", error);
        setError("Failed to save policy. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!policy) {
    return <p className="text-center">Policy not found</p>;
  }

  const handleDelete = () => {
    setActivePopDelete(true);
  };

  const onDelete = () => {
    if (!template_id) return;
    console.log(template_id);
    fetch(`/api/policies/${template_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete policy.");
        }
        return response.json();
      })
      .then(() => {
        console.log("Policy deleted successfully.");
        router.push("/policies");
      })
      .catch((error) => {
        console.error("Error deleting policy:", error);
        setError("Failed to delete policy. Please try again.");
      });
  };

  if (activePopDelete) {
    return (
      <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setActivePopDelete(false)} // Close the modal
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setActivePopDelete(false); // Close the modal after deletion
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center sm:px-2 px-1 py-2">
      <EditorHead
        title={editedPolicy.title}
        show_button={isEditing}
        handleDiscardChanges={handleDiscard}
        handleSaveChanges={handleSave}
        nav="policies"
        delete_button={true}
        handleDelete={handleDelete}
      />
      <hr className="border w-full my-2" />
      <div className="flex flex-col lg:flex-row w-full max-h-[550px] overflow-y-auto">
        <InputData
          handleChange={handleChange}
          title={editedPolicy.title}
          content={editedPolicy.content}
          date={editedPolicy.updated_date}
        />
        <SEO
          seoData={{
            seo_title: editedPolicy.seo_title,
            seo_description: editedPolicy.seo_description,
            seo_keywords: editedPolicy.seo_keywords,
            slug: editedPolicy.slug,
          }}
          template={editedPolicy.template_id}
          editSEO={editSEO}
          setEditSEO={setEditSEO}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PolicyPage;
