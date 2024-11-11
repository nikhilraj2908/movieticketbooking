const { getGfsBucket, conn } = require('../../Config/gfsbucket/gfsbucket');
const mongoose = require('mongoose');

const HandleGetFileByID = async (req, res) => {

    const { id } = req.params;
    try {
        // Convert the id from string to ObjectId
        const file = await conn.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!file) {
            return res.status(404).send('File not found.');
        }

        const downloadStream = gfsBucket.openDownloadStream(file._id);
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.filename}"`); // Corrected line
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file by id:', error);
        res.status(500).send('Error fetching file.');
    }

}

module.exports = {
    HandleGetFileByID
};
