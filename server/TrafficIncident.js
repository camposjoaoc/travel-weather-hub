// server.js (Backend)

/*import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const PORT = 8000;

app.use(cors());

const API_KEY = 'bc67eb1d6aa0423c9fa3f69f93349e30'; // Replace with your actual API key
const API_URL = 'https://api.trafikinfo.trafikverket.se/v2/data.json';

// Dynamic traffic endpoint with coordinates
app.get('/api/traffic-incidents', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing coordinates (lat, lng)' });
  }

  const xmlData = `
    <REQUEST>
      <LOGIN authenticationkey="${API_KEY}" />
      <QUERY objecttype="Situation" schemaversion="1" limit="10">
        <FILTER>
          <NEAR name="Deviation.Geometry.WGS84" value="${lng} ${lat}"/>
        </FILTER>
        <INCLUDE>Deviation.Message</INCLUDE>
        <INCLUDE>Deviation.SeverityText</INCLUDE>
        <INCLUDE>Deviation.LocationDescriptor</INCLUDE>
        <INCLUDE>Deviation.StartTime</INCLUDE>
        <INCLUDE>Deviation.EndTime</INCLUDE>  
      </QUERY>
    </REQUEST>
  `;

  try {
    const response = await axios.post(API_URL, xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });

    // Parse the Trafikverket response
    const result = response.data.RESPONSE.RESULT[0].Situation || [];
    const incidents = result.map((situation) => ({
      description: situation.Deviation[0]?.Message || 'No description',
      severity: situation.Deviation[0]?.SeverityText || 'Unknown',
      location: situation.Deviation[0]?.LocationDescriptor || 'Unknown',
      timestamp: situation.Deviation[0]?.EndTime || 'Unknown', // 
    }));

    res.json({ Situations: incidents });
  } catch (error) {
    console.error('Error fetching traffic incidents:', error);
    res.status(500).send({ error: 'Failed to fetch traffic incidents' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
