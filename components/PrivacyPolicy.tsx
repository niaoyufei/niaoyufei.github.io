import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Mail, FileText } from 'lucide-react';
import { APP_NAME } from '../constants';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 animate-fadeIn">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
               <ArrowLeft size={18} />
            </div>
            <span className="font-medium text-sm">返回主页</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">隐私政策与条款</h1>
          <p className="text-zinc-500 dark:text-zinc-400">最后更新日期：{new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-10">
          
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold mb-4 text-zinc-900 dark:text-white">
              <Lock className="text-blue-500" size={24} />
              1. 信息收集
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              {APP_NAME}（以下简称“本应用”）非常重视您的个人隐私。我们遵循“数据最小化”原则，仅收集提供服务所必需的最少量数据。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-300">
              <li><strong>用户生成内容：</strong> 您在应用中创建的清单、待办事项等数据将存储在您的本地设备或您选择的云服务（如 iCloud/微信云开发）中。</li>
              <li><strong>设备信息：</strong> 为了优化用户体验，我们可能会收集匿名的设备型号和操作系统版本信息。</li>
              <li><strong>不收集个人身份信息：</strong> 本应用不需要您提供姓名、手机号或身份证号等个人敏感信息即可使用。</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold mb-4 text-zinc-900 dark:text-white">
              <Eye className="text-blue-500" size={24} />
              2. 信息使用
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              我们收集的信息仅用于以下目的：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-300 mt-2">
              <li>提供、维护和改进应用的核心功能。</li>
              <li>修复程序崩溃和技术故障。</li>
              <li>在您主动请求时提供客户支持。</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold mb-4 text-zinc-900 dark:text-white">
              <FileText className="text-blue-500" size={24} />
              3. 数据安全与存储
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              我们会采取合理可行的安全措施来保护您的信息不被未经授权的访问、公开披露、使用、修改、损坏或丢失。
              如果您使用云同步功能，数据传输过程将采用 SSL/TLS 加密技术。
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold mb-4 text-zinc-900 dark:text-white">
              <Mail className="text-blue-500" size={24} />
              4. 联系我们
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              如果您对本隐私政策有任何疑问、意见或建议，或者需要进行数据相关的申诉，请通过以下方式联系我们：
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 inline-block">
              <p className="font-medium text-zinc-900 dark:text-white">电子邮箱：support@example.com</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;