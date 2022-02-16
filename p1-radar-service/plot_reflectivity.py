import nexradaws
import tempfile
import pytz
import pyart
from datetime import datetime,timedelta
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse

def nexrad_plot_reflectivity(radar_id, year, month, day, hour):
    try:
        templocation = tempfile.mkdtemp()
        conn = nexradaws.NexradAwsInterface()

        a = datetime(year, month, day, hour)
        
        availscans = conn.get_avail_scans(a.year, a.month, a.day, radar_id)
        #print("There are {} NEXRAD files available for the KTLX radar.\n".format(len(availscans)))
        #print(availscans[0:4])

        current_date_and_time = a
        #print(current_date_and_time)

        hours = 1

        futuredate = a - timedelta(hours=hours)
        eastern_timezone = pytz.timezone('US/Eastern')
    
        end = eastern_timezone.localize(datetime(a.year,a.month,a.day,a.hour,a.minute))
        start = eastern_timezone.localize (datetime(futuredate.year,futuredate.month,futuredate.day,futuredate.hour,futuredate.minute))
        scans = conn.get_avail_scans_in_range(start, end, radar_id)
        #print("There are {} scans available between {} and {}\n".format(len(scans), start, end))
        #print(scans[0:4])

        results = conn.download(scans[0:4], templocation)
    
        fig = plt.figure(figsize=(16,12))
        paths=os.listdir(templocation)

        for i,scan in enumerate(results.iter_success(),start=0):
            ax = fig.add_subplot(2,2,i+1)
            paths_loc=os.path.join(templocation,paths[i])
            
            image_name=scan.radar_id+"_"+scan.scan_time.strftime("%Y%m%d_%H")+".png"

            radar = pyart.io.read(paths_loc)
            display = pyart.graph.RadarDisplay(radar)
            display.set_limits((-150, 150), (-150, 150), ax=ax)
            display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
            
        image_loc=os.path.join(templocation,image_name)
        plt.savefig(image_loc)
        #print("Image",image_loc)

        # return FileResponse(image_loc )
        file_like = open(image_loc, mode="rb")
        return StreamingResponse(file_like, media_type="image/png")
    except Exception as e:
        print("Exception: plot_reflectivity:", e)