import matplotlib
matplotlib.use('Agg')
import tempfile
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

STATUS_COLORS = {
    "Off Duty": 0,
    "Sleeper Berth": 1,
    "Driving": 2,
    "On Duty (Not Driving)": 3,
}

def generate_status_graph(entries):
    start_time = datetime.strptime("00:00", "%H:%M")
    time_points = [start_time + timedelta(minutes=15 * i) for i in range(97)]  # 24 hours + final point

    entries = sorted(entries, key=lambda e: e.time)

    status_timeline = []
    current_status = "Off Duty"
    entry_index = 0
    remarks_at_index = {}

    for idx, t in enumerate(time_points):
        while entry_index < len(entries) and entries[entry_index].time <= t.time():
            e = entries[entry_index]
            current_status = e.status
            location = e.location or "Unknown"
            remarks = e.remarks or ""
            if remarks:
                remarks_at_index[idx] = f"{current_status} at {location}: {remarks}".strip(": ")
            entry_index += 1
        status_timeline.append(STATUS_COLORS.get(current_status, 0))

    fig, ax = plt.subplots(figsize=(18, 6))
    ax.step(range(len(time_points)), status_timeline, where='post', linewidth=2, color='blue')

    ax.set_yticks(list(STATUS_COLORS.values()))
    ax.set_yticklabels(list(STATUS_COLORS.keys()))
    ax.set_ylabel("Status")

    # Time ticks every hour
    hour_ticks = list(range(0, len(time_points), 4))
    hour_labels = [(start_time + timedelta(minutes=15 * i)).strftime("%H:%M") for i in hour_ticks]
    ax.set_xticks(hour_ticks)
    ax.set_xticklabels(hour_labels, fontsize=9, rotation=45)
    ax.set_xlabel("Time")
    ax.set_xlim(0, len(time_points) - 1)
    ax.set_ylim(-1.5, 3.5)

    # === Remarks Annotation ===
    for idx, remark in remarks_at_index.items():
        ax.annotate(
            remark,
            xy=(idx, -0.33),
            xycoords=('data', 'axes fraction'),
            ha='center',
            va='top',
            fontsize=8,
            rotation=45,
            bbox=dict(facecolor='white', edgecolor='gray', alpha=0.95, boxstyle='round,pad=0.2')
        )

    # === Proper "Remarks" Label on Bottom Left ===
    fig.text(
        0.01, 0.05,
        "Remarks",
        fontsize=15,
        fontweight='bold',
        ha='left',
        va='center'
    )

    ax.set_title("ELD Status Log (00:00 to 00:00)")
    ax.grid(True, axis='y')

    plt.subplots_adjust(bottom=0.35)
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.png')
    plt.tight_layout()
    plt.savefig(tmp_file.name, format='PNG')
    plt.close(fig)

    return tmp_file.name
