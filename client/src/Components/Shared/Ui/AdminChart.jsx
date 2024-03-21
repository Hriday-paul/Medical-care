import Chart from "react-apexcharts";

const AdminChart = ({ chartDates, chartResults }) => {

    const state = {
        options: {
            chart: {
                id: "basic-bar",
                type: 'line',
                parentHeightOffset: 0 // important to adjust height dynamically
            },
            xaxis: {
                categories: chartDates,
                labels: {
                    style: {
                        colors: ['#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB',],
                        fontSize: '13px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 300,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },

            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB', '#A6ADBB',],
                        fontSize: '11px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 300,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },

            },
            // other options...
            responsive: [
                {
                    breakpoint: 640,
                    options: {
                        chart: {
                            width: '300px' // Adjust height for small screens
                        }
                    }
                },
                {
                    breakpoint: 1025,
                    options: {
                        chart: {
                            width: '600px' // Adjust height for medium screens
                        }
                    }
                },
                {
                    breakpoint: 1281,
                    options: {
                        chart: {
                            width: '800px' // Adjust height for large screens
                        }
                    }
                },
                {
                    breakpoint: 1536,
                    options: {
                        chart: {
                            width: '900px' // Adjust height for large screens
                        }
                    }
                }
            ],

        },
        series: [
            {
                name: "Total Booked",
                data: chartResults
            }
        ]
    }

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="800"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminChart;