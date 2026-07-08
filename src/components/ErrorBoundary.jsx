import { Component } from "react";
import { RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error tertangkap oleh ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="text-center max-w-sm">
            <p className="text-2xl font-bold text-white">
              Oops, ada yang tidak beres
            </p>
            <p className="text-gray-400 mt-2">
              Terjadi kesalahan tak terduga pada aplikasi. Silakan coba muat
              ulang halaman.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <RefreshCw size={18} />
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
