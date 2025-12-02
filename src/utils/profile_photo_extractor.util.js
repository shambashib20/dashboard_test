const getPhotoUrl = (student) => {
    const docs = student?.documents || [];

    const photoDoc = docs.find(
        (d) => d?.course_document?.title?.toLowerCase() === "colour photo"
    );

    if (!photoDoc?.doc_file) return null;

    // If your backend gives relative URLs like "uploads/..."

    return `${import.meta.env.VITE_EXTERNAL_API}${photoDoc.doc_file}`;
};





export default getPhotoUrl