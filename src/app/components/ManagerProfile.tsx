import { User, Mail, Phone, MapPin, Briefcase, Calendar, ChevronLeft } from 'lucide-react';

export function ManagerProfile({ onBack }: { onBack: () => void }) {
  const managerData = {
    name: 'Rajesh Kumar',
    designation: 'Area Manager',
    employeeId: 'AM-2024-001',
    email: 'rajesh.kumar@bpcl.in',
    phone: '+91 98765 43210',
    location: 'West Delhi Region',
    joinDate: 'January 2020',
    experience: '15 years',
    outlets: 12,
    region: 'West Delhi',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32" style={{ backgroundColor: '#007BC9' }}></div>

        <div className="px-8 pb-8">
          <div className="flex items-end gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center" style={{ backgroundColor: '#FFE000' }}>
              <User size={64} className="text-gray-900" />
            </div>
            <div className="mb-4">
              <h2 className="text-2xl text-gray-900 mb-1">{managerData.name}</h2>
              <p className="text-gray-600">{managerData.designation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#007BC9' }}>
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="text-gray-900">{managerData.employeeId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#007BC9' }}>
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900">{managerData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#007BC9' }}>
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900">{managerData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#007BC9' }}>
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Region</p>
                  <p className="text-gray-900">{managerData.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#007BC9' }}>
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="text-gray-900">{managerData.joinDate}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Experience</span>
                  <span className="text-gray-900">{managerData.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Outlets Managed</span>
                  <span className="text-gray-900">{managerData.outlets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Region Coverage</span>
                  <span className="text-gray-900">{managerData.region}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-gray-900 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl text-gray-900 mb-1">92%</div>
                <div className="text-sm text-gray-600">Overall Target Achievement</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl text-gray-900 mb-1">8/12</div>
                <div className="text-sm text-gray-600">Top Performing Outlets</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl text-gray-900 mb-1">+15%</div>
                <div className="text-sm text-gray-600">YoY Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
